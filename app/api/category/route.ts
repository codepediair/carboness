import { db } from "@/db/drizzle";
import { category } from "@/db/schema/schema";

export async function GET() {
  try {
    // GET all Categories
    const rows = await db.select().from(category);

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
