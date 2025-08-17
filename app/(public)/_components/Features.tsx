import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap } from "lucide-react";

const featursItem = [
  {
    title: "Fast",
    description: "It supports an entire helping developers and innovate.",
  },
  {
    title: "Powerful",
    description: "It supports an entire helping developers and innovate.",
  },
  {
    title: "FasSecurityt",
    description: "It supports an entire helping developers and innovate.",
  },
  {
    title: "Customization",
    description: "It supports an entire helping developers and innovate.",
  },
  {
    title: "Control",
    description: "It supports an entire helping developers and innovate.",
  },
  {
    title: "Built for AI",
    description: "It supports an entire helping developers and innovate.",
  },
];

export default function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative mx-auto grid max-w-4xl divide-x divide-y *:p-12 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {featursItem.map((item) => (
            <Card key={item.title} className="space-y-3">
              <CardHeader className="flex items-center gap-2">
                <Zap className="size-4" />
                <h3 className="text-sm font-medium">{item.title}</h3>
              </CardHeader>
              <CardContent className="text-sm">{item.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
