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
      name: "Category 1: Direct Emissions",
      description: "Includes stationary combustion, process emissions, and direct sources",
    },
    {
      id: randomUUID(),
      name: "Category 2: Imported Energy Emissions",
      description: "Electricity, heat, and steam purchased from external sources",
    },
    {
      id: randomUUID(),
      name: "Category 3: Transportation Emissions",
      description: "Emissions from road, sea, air, and rail transport",
    },
    {
      id: randomUUID(),
      name: "Category 4: Product Use and Purchased Goods",
      description: "Raw materials, semi-finished goods, services, and waste",
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
    { categoryId: getCategoryId("Category 1"), name: "Natural Gas Boiler", description: "Stationary combustion system" },
    { categoryId: getCategoryId("Category 1"), name: "Coal Boiler", description: "Stationary combustion system" },
    { categoryId: getCategoryId("Category 1"), name: "Diesel Generator", description: "Mobile combustion unit" },

    // Category 2
    { categoryId: getCategoryId("Category 2"), name: "Grid Electricity", description: "Electricity purchased from national grid" },
    { categoryId: getCategoryId("Category 2"), name: "Certified Renewable Electricity", description: "Green energy with certification" },

    // Category 3
    { categoryId: getCategoryId("Category 3"), name: "Truck Transport", description: "Road freight transport" },
    { categoryId: getCategoryId("Category 3"), name: "Cargo Ships", description: "Sea freight transport" },
    { categoryId: getCategoryId("Category 3"), name: "Cargo Aircraft", description: "Air freight transport" },

    // Category 4
    { categoryId: getCategoryId("Category 4"), name: "Raw Material Consumption", description: "Material-based emissions" },
    { categoryId: getCategoryId("Category 4"), name: "Purchased Services", description: "Consulting, cleaning, logistics" },
    { categoryId: getCategoryId("Category 4"), name: "Waste Disposal", description: "Emissions from waste treatment" },
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
      subCategoryName: "Natural Gas Boiler",
      gasType: "CO2",
      value: "2.02",
      unit: "kgCO2e/m³",
      source: "IPCC 2006",
      year: 2023,
    },
    {
      subCategoryName: "Coal Boiler",
      gasType: "CO2",
      value: "2.93",
      unit: "kgCO2e/kg",
      source: "IPCC 2006",
      year: 2023,
    },
    {
      subCategoryName: "Grid Electricity",
      gasType: "CO2",
      value: "0.418",
      unit: "kgCO2e/kWh",
      source: "National Grid",
      year: 2023,
    },
    {
      subCategoryName: "Certified Renewable Electricity",
      gasType: "CO2",
      value: "0.05",
      unit: "kgCO2e/kWh",
      source: "Green Energy Registry",
      year: 2023,
    },
    {
      subCategoryName: "Truck Transport",
      gasType: "CO2",
      value: "0.12",
      unit: "kgCO2e/ton-km",
      source: "DEFRA",
      year: 2023,
    },
    {
      subCategoryName: "Cargo Ships",
      gasType: "CO2",
      value: "0.015",
      unit: "kgCO2e/ton-km",
      source: "IMO",
      year: 2023,
    },
    {
      subCategoryName: "Cargo Aircraft",
      gasType: "CO2",
      value: "0.5",
      unit: "kgCO2e/ton-km",
      source: "ICAO",
      year: 2023,
    },
    {
      subCategoryName: "Raw Material Consumption",
      gasType: "CO2",
      value: "1.8",
      unit: "kgCO2e/kg",
      source: "Ecoinvent",
      year: 2023,
    },
    {
      subCategoryName: "Purchased Services",
      gasType: "CO2",
      value: "0.25",
      unit: "kgCO2e/USD",
      source: "Scope 3 Estimation",
      year: 2023,
    },
    {
      subCategoryName: "Waste Disposal",
      gasType: "CH4",
      value: "0.8",
      unit: "kgCO2e/kg",
      source: "IPCC Waste Guidelines",
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