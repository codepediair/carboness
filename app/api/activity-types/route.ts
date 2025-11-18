import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { activityTypes } from "@/db/schema/schema";
import { sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emissionSourceId = searchParams.get("emissionSourceId");

  if (!emissionSourceId) {
    return NextResponse.json(
      { error: "emissionSourceId is required" },
      { status: 400 },
    );
  }

  const result = await db
    .select({ id: activityTypes.id, title: activityTypes.title })
    .from(activityTypes)
    .where(sql`${activityTypes.emissionSourceId} = ${emissionSourceId}`);

  return NextResponse.json(result);
}
