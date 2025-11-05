"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const inputSchema = z.object({
  // کلیدها داینامیک خواهند بود
  values: z.record(z.string(), z.string().min(1, "Required")),
});

type InputSchema = z.infer<typeof inputSchema>;

export default function EmissionForm({ categories }: { categories: any[] }) {
  const [step, setStep] = useState(0);
  const methods = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: { values: {} },
  });

  const onSubmit = (data: InputSchema) => {
    console.log("Collected data:", data);
    if (step < categories.length - 1) {
      setStep(step + 1);
    } else {
      console.log("✅ All steps completed, ready to send to API");
    }
  };

  const currentCat = categories[step];

  return (
    <FormProvider {...methods}>
      <Card className="max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>{currentCat.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {currentCat.description}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {currentCat.subCategories.map((sub: any) => (
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
