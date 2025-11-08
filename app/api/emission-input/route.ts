import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { activityTypes, emissionInputs } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

type Body = {
  values: Record<string, number>;
  attachments?: string | null;
  notes?: string | null;
  userId: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!body || !body.values || !body.userId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const inserted: string[] = [];

    for (const [sourceId, inputValue] of Object.entries(body.values)) {
      // Find an activityType associated with this emission source
      const at = await db.select().from(activityTypes).where(eq(activityTypes.sourceId, sourceId)).limit(1);
      if (!at.length) {
        // skip if no activity type found
        continue;
      }
      const activityId = (at[0] as any).id;
      const id = randomUUID();
      await db.insert(emissionInputs).values({
        id,
        activityId: String(activityId),
        userId: body.userId,
        inputValue: String(inputValue),
        notes: body.notes ?? null,
        attachments: body.attachments ?? null,
      });
      inserted.push(id);
    }

    return NextResponse.json({ insertedCount: inserted.length, inserted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create inputs" }, { status: 500 });
  }
}
