import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { emissionInputs, activityTypes } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    // Get all emission inputs with their related activity type data
    const allInputs = await db
      .select({
        id: emissionInputs.id,
        activityId: emissionInputs.activityId,
        userId: emissionInputs.userId,
        inputValue: emissionInputs.inputValue,
        inputDate: emissionInputs.inputDate,
        notes: emissionInputs.notes,
        attachments: emissionInputs.attachments,
        createdAt: emissionInputs.createdAt,
        activityTitle: activityTypes.title,
        unit: activityTypes.unit,
      })
      .from(emissionInputs)
      .leftJoin(
        activityTypes,
        eq(emissionInputs.activityId, activityTypes.id)
      );

    return NextResponse.json({
      success: true,
      data: allInputs,
      count: allInputs.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch emission inputs", success: false },
      { status: 500 }
    );
  }
}
