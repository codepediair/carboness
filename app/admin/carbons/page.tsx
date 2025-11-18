import { auth } from "@/lib/auth";
import * as React from "react";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function CarbonCategoryPage() {
  const allCategories = await db.select().from(categories);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session === null) {
    return redirect("/login");
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">All Categories</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((category) => (
          <Link
            key={category.id}
            href={`carbons/create?categoryId=${category.id}`}
            className="hover:no-underline"
          >
            <Card key={category.id} className="hover:shadow-md transaction">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
