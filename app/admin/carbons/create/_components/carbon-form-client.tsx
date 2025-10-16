"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInputSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type FormValues = z.infer<typeof userInputSchema>;

type SubCategoryOption = {
  id: string;
  name: string;
};

export default function UserInputForm() {
  const [loading, setLoading] = React.useState(false);
  const [subCategories, setSubCategories] = React.useState<SubCategoryOption[]>(
    []
  );
  const [loadingSubs, setLoadingSubs] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/sub-category");
        const data: SubCategoryOption[] = await res.json();
        if (mounted) setSubCategories(data);
      } catch {
        toast("error", { description: "Failed to load subcategories" });
      } finally {
        if (mounted) setLoadingSubs(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(userInputSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      subCategoryId: "",
      amount: 0,
      unit: "kg",
      scope: "scope1",
      note: "",
      recycledRatio: null,
      isCertifiedGreen: false,
      supplierClaim: "",
      dataSource: "manual",
      isDeleted: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err?.error ? JSON.stringify(err.error) : "Submit failed"
        );
      }

      toast("success", { description: "Input saved successfully" });
      form.reset();
    } catch (e: any) {
      toast("error", { description: e.message ?? "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add your carbon</CardTitle>
        <CardDescription>
          you can record all carbon footprint to this page
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="flex flex-col gap-6">
          {/* SubCategoryId */}
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loadingSubs || loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loadingSubs ? "Loading..." : "Choose a sub category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Unit */}
          <div className="flex flex-row gap-4">

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "kg",
                        "ton",
                        "m3",
                        "liter",
                        "kWh",
                        "MWh",
                        "km",
                        "ton-km",
                      ].map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

          {/* Scope */}
          <FormField
            control={form.control}
            name="scope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scope</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                    >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      {["scope1", "scope2", "scope3"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            </div>

          {/* Recycled Ratio */}
          <FormField
            control={form.control}
            name="recycledRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recycled Ratio (0–1)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Certified Green */}
          <FormField
            control={form.control}
            name="isCertifiedGreen"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Certified Green?</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Supplier Claim */}
          <FormField
            control={form.control}
            name="supplierClaim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier Claim</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Optional supplier claim..."
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Note */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Optional note..."
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          </div>
        </form>
      </Form>
      </CardContent>
    </Card>
  );
}
