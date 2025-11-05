import "dotenv/config";
import { db } from "@/db/drizzle";
import {
  categories,
  subCategories,
  emissionSources,
  emissionSourceTags,
} from "@/db/schema/schema";
import { randomUUID } from "crypto";
// Category definitions (based on ISO 14064-1)
const categoryData = [
  {
    title: "Category 1 – Direct Activities",
    description:
      "Emissions from sources directly owned or controlled by the company, such as on-site fuel combustion, company vehicles, and process gases.",
    subCategories: [
      {
        title: "Stationary Combustion",
        description: "Fuel combustion from boilers, furnaces, and generators.",
        sources: [
          { title: "Diesel Generator" },
          { title: "Natural Gas Boiler" },
          { title: "Fuel Oil Heater" },
        ],
        tags: ["energy"],
      },
      {
        title: "Mobile Combustion",
        description: "Company-owned vehicles and mobile machinery.",
        sources: [
          { title: "Company Cars" },
          { title: "Forklifts and Loaders" },
        ],
        tags: ["transport"],
      },
      {
        title: "Process Emissions",
        description: "Industrial process gases or chemical reactions.",
        sources: [{ title: "CO2 from Cement Production" }],
        tags: ["process"],
      },
    ],
  },
  {
    title: "Category 2 – Energy Indirect Activities",
    description:
      "Emissions from the generation of purchased electricity, heat, or steam consumed by the company.",
    subCategories: [
      {
        title: "Purchased Electricity",
        description: "Grid electricity consumption in buildings or facilities.",
        sources: [{ title: "Grid Power Consumption" }],
        tags: ["energy"],
      },
      {
        title: "Purchased Heat or Steam",
        description: "District heating or steam from external suppliers.",
        sources: [{ title: "District Heating" }],
        tags: ["energy"],
      },
    ],
  },
  {
    title: "Category 3 – Logistics Indirect Activities",
    description:
      "Emissions from transport and travel not directly controlled by the company.",
    subCategories: [
      {
        title: "Upstream Logistics",
        description: "Transport of raw materials or purchased goods.",
        sources: [{ title: "Inbound Freight" }],
        tags: ["transport"],
      },
      {
        title: "Business Travel",
        description: "Flights, trains, or car rentals for business trips.",
        sources: [{ title: "Air Travel" }, { title: "Train Travel" }],
        tags: ["transport"],
      },
      {
        title: "Employee Commuting",
        description: "Daily travel between home and workplace.",
        sources: [{ title: "Private Car Commuting" }],
        tags: ["transport"],
      },
    ],
  },
  {
    title: "Category 4 – Upstream Indirect Activities",
    description:
      "Emissions from supply chain processes before materials or services reach the company.",
    subCategories: [
      {
        title: "Purchased Materials",
        description: "Production of raw or intermediate materials.",
        sources: [{ title: "Steel Production" }, { title: "Plastic Resin" }],
        tags: ["supply-chain"],
      },
      {
        title: "Purchased Services",
        description:
          "Services provided by third parties (e.g., IT, consulting).",
        sources: [{ title: "IT Hosting Services" }],
        tags: ["service"],
      },
    ],
  },
  {
    title: "Category 5 – Downstream Indirect Activities",
    description:
      "Emissions occurring after products leave company control, such as during use or disposal.",
    subCategories: [
      {
        title: "Product Use Phase",
        description: "Energy used during the lifetime of products sold.",
        sources: [{ title: "Electric Appliance Usage" }],
        tags: ["product"],
      },
      {
        title: "End-of-Life",
        description: "Recycling or disposal of sold products or packaging.",
        sources: [{ title: "Product Disposal" }],
        tags: ["waste"],
      },
    ],
  },
  {
    title: "Category 6 – Other Indirect Activities",
    description:
      "Other emissions linked to the company’s operations, such as investments or leased assets.",
    subCategories: [
      {
        title: "Investments",
        description: "Financed emissions through investments or holdings.",
        sources: [{ title: "Equity Investments" }],
        tags: ["finance"],
      },
      {
        title: "Leased Assets",
        description: "Emissions from leased buildings or vehicles.",
        sources: [{ title: "Leased Office Space" }],
        tags: ["lease"],
      },
    ],
  },
];

export async function seedEmissionData() {
  console.log("🌱 Starting emission categories seeding...");

  for (const cat of categoryData) {
    const catId = randomUUID();

    await db.insert(categories).values({
      id: catId,
      title: cat.title,
      description: cat.description,
    });

    for (const sub of cat.subCategories) {
      const subId = randomUUID();

      await db.insert(subCategories).values({
        id: subId,
        categoryId: catId,
        title: sub.title,
        description: sub.description,
      });

      for (const src of sub.sources) {
        const srcId = randomUUID();

        await db.insert(emissionSources).values({
          id: srcId,
          subCategoryId: subId,
          title: src.title,
        });

        for (const tag of sub.tags) {
          await db.insert(emissionSourceTags).values({
            sourceId: srcId,
            tag,
          });
        }
      }
    }
  }

  console.log("✅ Emission categories seeded successfully!");
}

seedEmissionData();
