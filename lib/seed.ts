import { seedCategories } from "./seeds/01-categories";
import { seedSubcategoriesForCategory1 } from "./seeds/02-subCategories";
import { db } from "@/db/drizzle";

async function main() {
  console.log("🔽 Starting seed process...\n");

  await seedCategories();
  await seedSubcategoriesForCategory1();

  console.log("\n🌱 Seed process completed successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
