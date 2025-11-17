import { db } from "@/db/drizzle";
import { subCategories, emissionSources } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export async function seedEmissionSources() {
  const mapping = {
    "Stationary Combustion": [
      "Boilers",
      "Generators",
      "Cogeneration / Trigeneration Systems",
      "Process Heaters and Furnaces",
      "Turbines and Engines (Stationary)",
      "Other Stationary Combustion Systems",
      "Other Equipment",
    ],

    "Mobile Combustion": [
      "Road Transportation",
      "Off-Road / Non-Road Mobile Equipment",
      "Rail Transportation",
      "Marine Transportation",
      "Aviation",
      "Other Mobile Combustion Systems",
    ],

    "Direct Process Emissions and Removals from Industrial Processes": [
      "Mineral Industries",
      "Metallurgical Industries",
      "Chemical Industries",
      "Fluorinated Gases and Others",
      "Removals",
    ],

    "Direct Emissions from Greenhouse Gas Leaks/Sources in Anthropogenic Systems":
      [
        "Fuel Production and Distribution",
        "Solid Fuel Processing",
        "Refrigeration and Air Conditioning Systems",
        "Industrial Gas Systems",
        "Waste Management Leakage Sources",
        "Carbon Capture and Storage Systems (CCS)",
      ],

    "Direct Emissions and Removals from LULUCF Activities": [
      "Land-Use Changes",
      "Agricultural Lands",
      "Grasslands and Pastures",
      "Forests and Forest Management",
      "Wetlands and Special Areas",
      "Product and Biomass Usage",
    ],
  };

  for (const [subTitle, sources] of Object.entries(mapping)) {
    const sub = await db
      .select()
      .from(subCategories)
      .where(eq(subCategories.title, subTitle));

    if (sub.length === 0) {
      console.warn(`⚠ Subcategory not found: ${subTitle}`);
      continue;
    }

    const subCategoryId = sub[0].id;

    for (const title of sources) {
      const exists = await db
        .select()
        .from(emissionSources)
        .where(eq(emissionSources.title, title));

      if (exists.length === 0) {
        await db.insert(emissionSources).values({
          title,
          subCategoryId,
        });
      }
    }
  }

  console.log("✔ Emission Sources seeded successfully.");
}
