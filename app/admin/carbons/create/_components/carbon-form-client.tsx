"use client";

export const dynamic = "force-dynamic";
import * as React from "react";
import { useForm } from "react-hook-form";
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
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FormValues = z.infer<typeof userInputSchema>;
type SubCategoryOption = { id: string; name: string };

export default function CarbonInputForm() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [loading, setLoading] = React.useState(false);
  const [subCategories, setSubCategories] = React.useState<SubCategoryOption[]>(
    []
  );
  const [loadingSubs, setLoadingSubs] = React.useState(true);

  // Fetch subcategories
  React.useEffect(() => {
    let mounted = true;
    if (!categoryId) {
      toast("error", {
        description: "category id not valid or not found",
      });
      setLoadingSubs(false);
      // return;
    }
    (async () => {
      try {
        const res = await fetch(
          categoryId
            ? `/api/sub-category?categoryId=${categoryId}`
            : "/api/sub-category"
        );
        // const res = await fetch(url);
        const data: SubCategoryOption[] = await res.json();
        if (mounted) setSubCategories(data);
      } catch {
        toast("error", {
          description: "Failed to load subcategories",
        });
      } finally {
        if (mounted) setLoadingSubs(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [categoryId]);

  const form = useForm<FormValues>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      subCategoryId: "",
      amount: 0, // Ensure amount is initialized as a number
      unit: "m3",
      scope: "directly",
      note: "",
      source: "manual",
      isDeleted: false,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: FormValues) {
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

      toast("success", {
        description: "All inputs have been saved successfully",
      });

      form.reset();
    } catch (e: any) {
      toast("error", {
        description: e.message ?? "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="py-16">
        <Card className="mx-auto max-w-lg p-4 shadow-md sm:p-16">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">
              Record your Carbone to track
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter all field to record corectly your used carbon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 w-full"
              >
                {/* SubCategory Selection */}
                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>sub category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={loadingSubs || loading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                loadingSubs ? "loading..." : "please chose ..."
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

                {/* amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          inputMode="decimal"
                          placeholder="exam: 12.5"
                          value={field.value === undefined ? "" : field.value}
                          onChange={(e) => {
                            const v = e.target.value;
                            field.onChange(v === "" ? undefined : Number(v));
                          }}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Unit */}
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>unit</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={loading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {["m3", "liter", "gallon", "kg", "ton"].map((u) => (
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
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select domain" />
                          </SelectTrigger>
                          <SelectContent>
                            {["directly", "indirectly", "inChain"].map((s) => (
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

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Note is Optional..."
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* save button */}
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}
