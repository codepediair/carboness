"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
  description?: string;
  slug: string;
};

export default function CarbonCategoryPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/category");
        const data: Category[] = await res.json();
        if (mounted) setCategories(data);
      } catch {
        toast("error",{
          description: "categories not loaded",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))
        : categories.map((cat) => (
            <Card key={cat.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {cat.description || "With out description"}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/admin/carbons/create?categoryId=${cat.id}`}>
                  <Button variant="outline">Enter to category</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
    </div>
  );
}