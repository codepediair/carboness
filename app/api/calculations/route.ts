import { db } from "@/db/drizzle";
import { userInput } from "@/db/schema/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const scope = searchParams.get("scope");
    const subCategoryId = searchParams.get("subCategoryId");

    // ساخت شرط‌ها
    const conditions = [];
    if (userId) conditions.push(eq(userInput.userId, userId));
    if (scope) conditions.push(eq(userInput.scope, scope as "scope1" | "scope2" | "scope3"));
    if (subCategoryId) conditions.push(eq(userInput.subCategoryId, subCategoryId));

    // گرفتن داده‌ها
    const rows = await db
      .select()
      .from(userInput)
      .where(conditions.length ? and(...conditions) : undefined);

    // محاسبه مجموع CO2e
    const totalCO2e = rows.reduce((sum, row) => sum + (row.calculatedCO2e ?? 0), 0);

    // گروه‌بندی بر اساس scope
    const byScope: Record<string, number> = {};
    rows.forEach((row) => {
      const s = row.scope;
      byScope[s] = (byScope[s] ?? 0) + (row.calculatedCO2e ?? 0);
    });

    // گروه‌بندی بر اساس unit
    const byUnit: Record<string, number> = {};
    rows.forEach((row) => {
      const u = row.unit;
      byUnit[u] = (byUnit[u] ?? 0) + (row.amount ?? 0);
    });

    return new Response(
      JSON.stringify({ totalCO2e, byScope, byUnit }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (e) {
    console.error("Calculation API error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
