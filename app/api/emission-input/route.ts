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
      // Log the incoming value for debugging
      console.log("emission-input POST - sourceId", sourceId, "value", inputValue);

      // Try to find an activityType associated with this emission source
      const at = await db.select().from(activityTypes).where(eq(activityTypes.sourceId, sourceId)).limit(1);
      let activityId: string;
      if (!at.length) {
        // If no activity type exists for this source, create a minimal one so inputs can reference it
        activityId = randomUUID();
        try {
          await db.insert(activityTypes).values({
            id: activityId,
            sourceId: sourceId,
            title: `Auto-created activity for ${sourceId}`,
            description: `Automatically created activity type for source ${sourceId}`,
            unit: "tCO2e",
            emissionFactor: "0.0",
            emissionFactorSource: "",
            emissionFactorYear: null,
          });
        } catch (err) {
          console.error("Failed to create activityType for source", sourceId, err);
          continue;
        }
      } else {
        activityId = (at[0] as any).id;
      }
      const id = randomUUID();
      await db.insert(emissionInputs).values({
        id,
        activityId: activityId as any, // Store as UUID, not string
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
