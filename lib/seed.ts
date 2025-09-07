import "dotenv/config";
import { db } from "@/db/drizzle";
import { category, subCategory, emissionFactor } from "@/db/schema/schema";
import { randomUUID } from "crypto";
import slugify from "slugify";

async function seed() {
  console.log("🌱 Starting full seed...");

  // --- 1. Categories ---
  const categoriesData = [
    {
      id: randomUUID(),
      name: "Category 1: Fuel and Refrigerants",
      description: "Includes stationary fuel, mobile fuel, and refrigerants",
    },
    {
      id: randomUUID(),
      name: "Category 2: Purchased Electricity",
      description: "Electricity consumption and related greenhouse gas emissions",
    },
    {
      id: randomUUID(),
      name: "Category 3: Transportation, Services, and Travel",
      description: "Emissions from transportation of goods, services, and business travel",
    },
    {
      id: randomUUID(),
      name: "Category 4: Raw Materials, Machinery, Waste, and Purchased Services",
      description: "Emissions from raw materials, machinery, waste, and purchased services",
    },
    {
      id: randomUUID(),
      name: "Category 5: End-of-Life of Sold Products",
      description: "Emissions from the end-of-life stage of sold products",
    },
    {
      id: randomUUID(),
      name: "Category 6: Electricity Transmission and Distribution Losses",
      description: "Emissions from electricity grid losses",
    },
  ].map(c => ({
    ...c,
    slug: slugify(c.name, { lower: true, strict: true }),
  }));

  await db.insert(category).values(categoriesData);
  console.log("✅ Categories inserted");

  const getCategoryId = (name: string) =>
    categoriesData.find(c => c.name.startsWith(name))?.id ?? "";

  // --- 2. SubCategories ---
  const subCategoriesData = [
    // Category 1
    { categoryId: getCategoryId("Category 1"), name: "Stationary Fuel", description: "Natural gas, LPG, propane" },
    { categoryId: getCategoryId("Category 1"), name: "Mobile Fuel", description: "On-road and off-road diesel" },
    { categoryId: getCategoryId("Category 1"), name: "Refrigerants", description: "Air conditioners, chillers, refrigerators, water coolers" },

    // Category 2
    { categoryId: getCategoryId("Category 2"), name: "Electricity Consumption", description: "Calculate CO₂, CH₄, N₂O emissions based on kWh" },

    // Category 3
    { categoryId: getCategoryId("Category 3"), name: "Transport of Raw Materials and Products", description: "Road, sea transport" },
    { categoryId: getCategoryId("Category 3"), name: "Services", description: "Maintenance, catering, waste transport" },
    { categoryId: getCategoryId("Category 3"), name: "Business Travel", description: "Road and air travel" },

    // Category 4
    { categoryId: getCategoryId("Category 4"), name: "Raw Materials", description: "Weight × EF" },
    { categoryId: getCategoryId("Category 4"), name: "Machinery", description: "Weight × EF" },
    { categoryId: getCategoryId("Category 4"), name: "Waste", description: "Weight × EF" },
    { categoryId: getCategoryId("Category 4"), name: "Purchased Services", description: "Cost × EF" },

    // Category 5
    { categoryId: getCategoryId("Category 5"), name: "Product End-of-Life", description: "Product weight × EF" },

    // Category 6
    { categoryId: getCategoryId("Category 6"), name: "Electricity Grid Losses", description: "Category 2 emissions × grid loss percentage" },
  ].map(sc => ({
    id: randomUUID(),
    ...sc,
    slug: slugify(sc.name, { lower: true, strict: true }),
  }));

  await db.insert(subCategory).values(subCategoriesData);
  console.log("✅ SubCategories inserted");

  const getSubCategoryId = (name: string) =>
    subCategoriesData.find(sc => sc.name === name)?.id ?? "";

  // --- 3. Emission Factors ---
  const emissionFactorsData = [
    {
      subCategoryName: "Stationary Fuel",
      gasType: "CO2",
      value: "2.75",
      unit: "kgCO2e/liter",
      source: "IPCC 2006 Guidelines",
      year: 2023,
    },
    {
      subCategoryName: "Mobile Fuel",
      gasType: "CO2",
      value: "2.68",
      unit: "kgCO2e/liter",
      source: "DEFRA 2023",
      year: 2023,
    },
    {
      subCategoryName: "Refrigerants",
      gasType: "HFC-134a",
      value: "1430",
      unit: "kgCO2e/kg",
      source: "IPCC AR5",
      year: 2023,
    },
    {
      subCategoryName: "Electricity Consumption",
      gasType: "CO2",
      value: "0.4183",
      unit: "kgCO2e/kWh",
      source: "National Grid Factors",
      year: 2023,
    },
    {
      subCategoryName: "Electricity Consumption",
      gasType: "CH4",
      value: "0.0001",
      unit: "kgCO2e/kWh",
      source: "National Grid Factors",
      year: 2023,
    },
    {
      subCategoryName: "Electricity Consumption",
      gasType: "N2O",
      value: "0.0015",
      unit: "kgCO2e/kWh",
      source: "National Grid Factors",
      year: 2023,
    },
  ].map(ef => ({
    id: randomUUID(),
    subCategoryId: getSubCategoryId(ef.subCategoryName),
    gasType: ef.gasType,
    value: ef.value,
    unit: ef.unit,
    source: ef.source,
    year: ef.year,
  }));

  await db.insert(emissionFactor).values(emissionFactorsData);
  console.log("✅ Emission Factors inserted");

  console.log("🌱 Full seed completed successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed", err);
  process.exit(1);
});