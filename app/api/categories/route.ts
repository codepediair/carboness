// app/api/categories/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema/schema";

export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
