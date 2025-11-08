"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Validate that every value entered is a non-empty numeric value (string inputs
// from form are validated here). We keep attachments flexible (any) to allow
// File objects or strings depending on how you send them.
const emissionFormSchema = z.object({
  values: z.record(
    z.string(),
    z.string().refine((s) => s !== "" && !Number.isNaN(Number(s)), {
      message: "Required numeric value",
    })
  ),
  attachments: z.any().optional(),
});

type InputSchema = z.infer<typeof emissionFormSchema>;

export default function EmissionForm({ categories, userId }: { categories: any[]; userId?: string | null }) {
  const [step, setStep] = useState(0);
  const methods = useForm<InputSchema>({
    resolver: zodResolver(emissionFormSchema),
    defaultValues: { values: {} },
  });

  const currentCat = categories[step];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      methods.setValue("attachments", file);
    }
  };

  const onSubmit = async (data: InputSchema) => {
    // Convert values from validated numeric strings to numbers before sending
    const numericValues: Record<string, number> = Object.fromEntries(
      Object.entries(data.values).map(([k, v]) => [k, Number(v)])
    );

    const isFinal = step === categories.length - 1;

    // Handle attachment upload if file provided
    let attachmentUrl: string | null = null;
    const attachmentsValue = methods.getValues("attachments");
    try {
      if (attachmentsValue && typeof (attachmentsValue as any).name === "string") {
        const form = new FormData();
        form.append("file", attachmentsValue as File);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
        const uploadJson = await uploadRes.json();
        if (uploadRes.ok && uploadJson.url) attachmentUrl = uploadJson.url;
      } else if (typeof attachmentsValue === "string") {
        attachmentUrl = attachmentsValue as string;
      }
    } catch (err) {
      console.error("Upload failed", err);
    }

    if (!isFinal) {
      setStep(step + 1);
      return;
    }

    // Now persist to server
    if (!userId) {
      console.error("No userId provided; cannot save input");
      return;
    }

    try {
      const res = await fetch("/api/emission-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: numericValues, attachments: attachmentUrl, notes: null, userId }),
      });
      const json = await res.json();
      if (!res.ok) {
        console.error("Failed to save inputs", json);
      } else {
        console.log("Saved inputs", json);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>{currentCat?.title ?? ""}</CardTitle>
          <p className="text-sm text-muted-foreground">{currentCat?.description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {currentCat?.subCategories?.map((sub: any) => (
              <div key={sub.id} className="space-y-2">
                <h3 className="font-semibold">{sub.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {sub.description}
                </p>
                <Separator />
                {sub.emissionSources.map((src: any) => (
                  <div key={src.id} className="flex items-center gap-2">
                    <label className="w-48 text-sm">{src.title}</label>
                    <Input
                      type="number"
                      placeholder="Enter value"
                      {...methods.register(`values.${src.id}`)}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* File upload shown on step 4 (index 3) or final step */}
            {(step === 3 || step === categories.length - 1) && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Attachment (optional)</label>
                <input type="file" onChange={handleFileUpload} />
              </div>
            )}

            <div className="flex justify-between">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(step + 1)}
                >
                  Skip
                </Button>

                <Button type="submit">
                  {step === categories.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
