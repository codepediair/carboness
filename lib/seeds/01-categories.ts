import { db } from "@/db/drizzle";
import { categories } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function seedCategories() {
  const data = [
    {
      title: "Direct Greenhouse Gas Emissions and Removals (CO₂e)",
      description:
        "Emissions and removals that occur directly from sources owned or controlled by the organization.",
    },
    {
      title: "Indirect Greenhouse Gas Emissions from Imported Energy",
      description:
        "Emissions resulting from purchased or imported electricity, steam, heating, and cooling consumed by the organization.",
    },
    {
      title: "Indirect Greenhouse Gas Emissions from Transportation",
      description:
        "Emissions arising from transportation activities not directly controlled by the organization.",
    },
    {
      title: "Indirect Emissions from Products Used by the Organization",
      description:
        "Emissions from the production, processing, or transportation of goods and services purchased and used by the organization.",
    },
    {
      title: "Indirect Emissions from Post-Use of Products",
      description:
        "Emissions generated during the use phase of products after they leave the organization.",
    },
    {
      title: "Other Indirect Greenhouse Gas Emissions",
      description:
        "Emissions from other indirect sources not included in the previous categories.",
    },
  ];

  for (const item of data) {
    const exists = await db
      .select()
      .from(categories)
      .where(eq(categories.title, item.title));

    if (exists.length === 0) {
      await db.insert(categories).values(item);
    }
  }

  console.log("✔ Categories seeded successfully.");
}
