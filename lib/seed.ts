import "dotenv/config";
import { db } from "@/db/drizzle";
import { category, subCategory, emissionFactor } from "@/db/schema/schema";
import { randomUUID } from "crypto";
import slugify from "slugify";

function withMeta<T extends { name: string }>(item: T) {
  return {
    id: randomUUID(),
    slug: slugify(item.name, { lower: true, strict: true }),
    ...item,
  };
}

async function seed() {
  console.log("🌱 Starting full seed...");

  const categoriesData = [
    { name: "Category 1: Direct Emissions", description: "Stationary combustion, process emissions, direct sources" },
    { name: "Category 2: Imported Energy Emissions", description: "Electricity, heat, steam purchased externally" },
    { name: "Category 3: Transportation Emissions", description: "Road, sea, air, rail transport" },
    { name: "Category 4: Product Use and Purchased Goods", description: "Raw materials, services, waste" },
  ].map(withMeta);

  const getCategoryId = (prefix: string) =>
    categoriesData.find(c => c.name.startsWith(prefix))?.id ?? "";

  const subCategoriesData = [
    { categoryId: getCategoryId("Category 1"), name: "Natural Gas Boiler", description: "Stationary combustion" },
    { categoryId: getCategoryId("Category 1"), name: "Coal Boiler", description: "Stationary combustion" },
    { categoryId: getCategoryId("Category 1"), name: "Diesel Generator", description: "Mobile combustion" },
    { categoryId: getCategoryId("Category 2"), name: "Grid Electricity", description: "National grid electricity" },
    { categoryId: getCategoryId("Category 2"), name: "Certified Renewable Electricity", description: "Green certified energy" },
    { categoryId: getCategoryId("Category 3"), name: "Truck Transport", description: "Road freight" },
    { categoryId: getCategoryId("Category 3"), name: "Cargo Ships", description: "Sea freight" },
    { categoryId: getCategoryId("Category 3"), name: "Cargo Aircraft", description: "Air freight" },
    { categoryId: getCategoryId("Category 4"), name: "Raw Material Consumption", description: "Material-based emissions" },
    { categoryId: getCategoryId("Category 4"), name: "Purchased Services", description: "Consulting, cleaning, logistics" },
    { categoryId: getCategoryId("Category 4"), name: "Waste Disposal", description: "Waste treatment emissions" },
  ].map(withMeta);

  const getSubCategoryId = (name: string) =>
    subCategoriesData.find(sc => sc.name === name)?.id ?? "";

  const emissionFactorsData = [
    { subCategoryName: "Natural Gas Boiler", gas: "CO2", value: "2.02", unit: "m3", source: "IPCC 2006", year: 2023 },
    { subCategoryName: "Coal Boiler", gas: "CO2", value: "2.93", unit: "kg", source: "IPCC 2006", year: 2023 },
    { subCategoryName: "Grid Electricity", gas: "CO2", value: "0.418", unit: "kWh", source: "National Grid", year: 2023 },
    { subCategoryName: "Certified Renewable Electricity", gas: "CO2", value: "0.05", unit: "kWh", source: "Green Registry", year: 2023 },
    { subCategoryName: "Truck Transport", gas: "CO2", value: "0.12", unit: "ton-km", source: "DEFRA", year: 2023 },
    { subCategoryName: "Cargo Ships", gas: "CO2", value: "0.015", unit: "ton-km", source: "IMO", year: 2023 },
    { subCategoryName: "Cargo Aircraft", gas: "CO2", value: "0.5", unit: "ton-km", source: "ICAO", year: 2023 },
    { subCategoryName: "Raw Material Consumption", gas: "CO2", value: "1.8", unit: "kg", source: "Ecoinvent", year: 2023 },
    { subCategoryName: "Purchased Services", gas: "CO2", value: "0.25", unit: "USD", source: "Scope 3 Estimation", year: 2023 },
    { subCategoryName: "Waste Disposal", gas: "CH4", value: "0.8", unit: "kg", source: "IPCC Waste", year: 2023 },
  ].map(ef => ({
    id: randomUUID(),
    subCategoryId: getSubCategoryId(ef.subCategoryName),
    ...ef,
  }));

  await db.transaction(async (tx) => {
    await tx.insert(category).values(categoriesData);
    await tx.insert(subCategory).values(subCategoriesData);
    await tx.insert(emissionFactor).values(emissionFactorsData);

  });
  
  console.log("🌱 Full seed completed successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed", err);
  process.exit(1);
});