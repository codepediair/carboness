import { db } from "@/db/drizzle";
import { subCategory } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const query = categoryId
      ? db.select().from(subCategory).where(eq(subCategory.categoryId, categoryId))
      : db.select().from(subCategory);

    const rows = await query;

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
