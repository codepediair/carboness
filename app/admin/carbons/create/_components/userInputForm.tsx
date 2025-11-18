"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

// ---------- Zod Schema ----------
const userInputSchema = z.object({
  userId: z.string().uuid(),
  subCategoryId: z.string().uuid({ message: "Select a subcategory" }),
  emissionSourceId: z.string().uuid({ message: "Select an emission source" }),
  activityTypeId: z.string().uuid({ message: "Select an activity type" }),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be positive"),
  activityDate: z.date({ message: "Activity date is required" }),
  notes: z.string().optional(),
});

type UserInputFormValues = z.infer<typeof userInputSchema>;

// ---------- Component ----------
export function UserInputForm({ currentUserId }: { currentUserId: string }) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [subCategories, setSubCategories] = useState<
    { id: string; title: string }[]
  >([]);
  const [emissionSources, setEmissionSources] = useState<
    { id: string; title: string }[]
  >([]);
  const [activityTypes, setActivityTypes] = useState<
    { id: string; title: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserInputFormValues>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      userId: currentUserId,
      subCategoryId: "",
      emissionSourceId: "",
      activityTypeId: "",
      amount: 0,
      activityDate: new Date(),
      notes: "",
    },
  });

  const selectedSubCategory = watch("subCategoryId");
  const selectedEmissionSource = watch("emissionSourceId");

  // --- Fetch subcategories for selected category ---
  useEffect(() => {
    if (!categoryId) return;
    async function fetchSubCategories() {
      const res = await fetch(`/api/sub-categories?categoryId=${categoryId}`);
      if (res.ok) setSubCategories(await res.json());
    }
    fetchSubCategories();
  }, [categoryId]);

  // --- Fetch emission sources based on selected subcategory ---
  useEffect(() => {
    if (!selectedSubCategory) {
      setEmissionSources([]);
      setValue("emissionSourceId", "");
      return;
    }
    async function fetchEmissionSources() {
      const res = await fetch(
        `/api/emission-sources?subCategoryId=${selectedSubCategory}`,
      );
      if (res.ok) setEmissionSources(await res.json());
    }
    fetchEmissionSources();
  }, [selectedSubCategory, setValue]);

  // --- Fetch activity types based on selected emission source ---
  useEffect(() => {
    if (!selectedEmissionSource) {
      setActivityTypes([]);
      setValue("activityTypeId", "");
      return;
    }
    async function fetchActivityTypes() {
      const res = await fetch(
        `/api/activity-types?emissionSourceId=${selectedEmissionSource}`,
      );
      if (res.ok) setActivityTypes(await res.json());
    }
    fetchActivityTypes();
  }, [selectedEmissionSource, setValue]);

  const onSubmit = async (data: UserInputFormValues) => {
    try {
      const res = await fetch("/api/user-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      alert("Activity submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting activity");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FieldGroup>
          <input type="hidden" value={currentUserId} {...register("userId")} />

          {/* Subcategory */}
          <Field>
            <FieldSet>
              <FieldLegend>Add Carbon</FieldLegend>
              <FieldDescription>
                All transactions are secure and encrypted
              </FieldDescription>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Sub Category
                </FieldLabel>

                <Select
                  value={watch("subCategoryId")}
                  onValueChange={(val) => setValue("subCategoryId", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subCategoryId && (
                  <p className="text-red-500">{errors.subCategoryId.message}</p>
                )}
              </Field>

              {/* Emission Source */}
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Emission Source
                </FieldLabel>
                <Select
                  value={watch("emissionSourceId")}
                  onValueChange={(val) => setValue("emissionSourceId", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select emission source" />
                  </SelectTrigger>
                  <SelectContent>
                    {emissionSources.map((es) => (
                      <SelectItem key={es.id} value={es.id}>
                        {es.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.emissionSourceId && (
                  <p className="text-red-500">
                    {errors.emissionSourceId.message}
                  </p>
                )}
              </Field>
              {/* Activity Type */}
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Activity Type
                </FieldLabel>

                <Select
                  value={watch("activityTypeId")}
                  onValueChange={(val) => setValue("activityTypeId", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((at) => (
                      <SelectItem key={at.id} value={at.id}>
                        {at.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.activityTypeId && (
                  <p className="text-red-500">
                    {errors.activityTypeId.message}
                  </p>
                )}
              </Field>
            </FieldSet>
          </Field>

          {/* Amount */}
          <Field>
            <FieldLabel>Amount</FieldLabel>
            <Input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.0001"
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </Field>
          {/* Activity Date */}
          <Field>
            <FieldLabel>Activity Date</FieldLabel>
            <Input
              type="date"
              value={format(watch("activityDate"), "yyyy-MM-dd")}
              onChange={(e) =>
                setValue("activityDate", new Date(e.target.value))
              }
            />
            {errors.activityDate && (
              <p className="text-red-500">{errors.activityDate.message}</p>
            )}
          </Field>

          {/* Notes */}
          <Field>
            <FieldLabel>Notes</FieldLabel>
            <Textarea {...register("notes")} placeholder="Optional notes..." />
          </Field>

          <Button type="submit">Submit</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
