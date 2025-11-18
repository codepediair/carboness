import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { subCategories } from "@/db/schema/schema";
import { sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json(
      { error: "categoryId is required" },
      { status: 400 },
    );
  }

  const result = await db
    .select({ id: subCategories.id, title: subCategories.title })
    .from(subCategories)
    .where(sql`${subCategories.categoryId} = ${categoryId}`);

  return NextResponse.json(result);
}
