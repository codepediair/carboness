import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { emissionSources } from "@/db/schema/schema";
import { sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subCategoryId = searchParams.get("subCategoryId");

  if (!subCategoryId) {
    return NextResponse.json(
      { error: "subCategoryId is required" },
      { status: 400 },
    );
  }

  const result = await db
    .select({ id: emissionSources.id, title: emissionSources.title })
    .from(emissionSources)
    .where(sql`${emissionSources.subCategoryId} = ${subCategoryId}`);

  return NextResponse.json(result);
}
