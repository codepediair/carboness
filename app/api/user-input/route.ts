import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { userInput } from "@/db/schema/schema";
import { userInputSchema } from "@/lib/zodSchema";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = userInputSchema.parse(body);

    const inserted = await db.insert(userInput).values({
      userId: data.userId,
      activityTypeId: data.activityTypeId,
      amount: data.amount,
      activityDate: data.activityDate,
      notes: data.notes,
    });

    return NextResponse.json({ success: true, inserted });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
