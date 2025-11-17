import "dotenv/config";
import { seedCategories } from "@/db/seeds/01-categories";
import { seedSubcategoriesForCategory1 } from "@/db/seeds/02-subCategories";
import { seedActivityTypes } from "@/db/seeds/04-activityTypes";
import { db } from "@/db/drizzle";
import { seedEmissionSources } from "@/db/seeds/03-emissionSources";

async function main() {
  console.log("🔽 Starting seed process...\n");

  await seedCategories();
  await seedSubcategoriesForCategory1();
  await seedEmissionSources();
  await seedActivityTypes();

  console.log("\n🌱 Seed process completed successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
