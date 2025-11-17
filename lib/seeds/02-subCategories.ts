import { db } from "@/db/drizzle";
import { categories, subCategories } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function seedSubcategoriesForCategory1() {
  const category1 = await db
    .select()
    .from(categories)
    .where(
      eq(
        categories.title,
        "Direct Greenhouse Gas Emissions and Removals (CO₂e)",
      ),
    );

  if (category1.length === 0) {
    throw new Error("Category 1 not found. Seed categories first.");
  }

  const categoryId = category1[0].id;

  const data = [
    {
      title: "Stationary Combustion",
      description:
        "Emissions from fuel burned in stationary equipment such as boilers, furnaces, and generators.",
      categoryId,
    },
    {
      title: "Mobile Combustion",
      description:
        "Emissions from fuel used in vehicles, machinery, and mobile equipment.",
      categoryId,
    },
    {
      title: "Direct Process Emissions and Removals from Industrial Processes",
      description:
        "Emissions and removals generated directly from chemical or industrial processes.",
      categoryId,
    },
    {
      title:
        "Direct Emissions from Greenhouse Gas Leaks/Sources in Anthropogenic Systems",
      description:
        "Emissions due to leaks or unintended releases of greenhouse gases from human-made systems.",
      categoryId,
    },
    {
      title: "Direct Emissions and Removals from LULUCF Activities",
      description:
        "Direct emissions and removals arising from land use, land-use change, and forestry activities (LULUCF).",
      categoryId,
    },
  ];

  for (const item of data) {
    const exists = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.title, item.title));

    if (exists.length === 0) {
      await db.insert(subCategories).values(item);
    }
  }

  console.log("✔ Subcategories for Category 1 seeded successfully.");
}
