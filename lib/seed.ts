import "dotenv/config";
import { db } from "@/db/drizzle";
import { 
  scope, 
  category, 
  subCategory, 
  activityType, 
  emissionFactor,
  scopeEnum,
  fuelTypeEnum,
  transportTypeEnum,
  vehicleTypeEnum,
  wasteTypeEnum,
  unitEnum
} from "@/db/schema/schema";
import { randomUUID } from "crypto";
import slugify from "slugify";

import { 
  unitEnumValues, 
  fuelTypeEnumValues, 
  transportTypeEnumValues,
  vehicleTypeEnumValues,
  type UnitType,
  type FuelType 
} from "./zodSchema";

async function seed() {
  console.log("🌱 Starting full seed for new schema...");

  // --- 1. Scopes ---
  const scopesData = [
    {
      id: randomUUID(),
      name: "Scope 1: Direct Emissions",
      description: "Direct greenhouse gas emissions from owned or controlled sources",
      position: 1,
    },
    {
      id: randomUUID(),
      name: "Scope 2: Indirect Energy Emissions",
      description: "Indirect emissions from the generation of purchased electricity, steam, heating and cooling",
      position: 2,
    },
    {
      id: randomUUID(),
      name: "Scope 3: Other Indirect Emissions",
      description: "All other indirect emissions that occur in the value chain",
      position: 3,
    },
  ].map(s => ({
    ...s,
    slug: slugify(s.name, { lower: true, strict: true }),
  }));

  await db.insert(scope).values(scopesData);
  console.log("✅ Scopes inserted");

  const getScopeId = (name: string) =>
    scopesData.find(s => s.name.startsWith(name))?.id ?? "";

  // --- 2. Categories ---
  const categoriesData = [
    // Scope 1 Categories
    { scopeId: getScopeId("Scope 1"), name: "Stationary Combustion", description: "Fuel combustion in boilers, furnaces, turbines", position: 1 },
    { scopeId: getScopeId("Scope 1"), name: "Mobile Combustion", description: "Fuel combustion in vehicles and mobile equipment", position: 2 },
    { scopeId: getScopeId("Scope 1"), name: "Process Emissions", description: "Emissions from industrial processes", position: 3 },
    { scopeId: getScopeId("Scope 1"), name: "Fugitive Emissions", description: "Leaks from refrigeration, air conditioning, and other systems", position: 4 },

    // Scope 2 Categories
    { scopeId: getScopeId("Scope 2"), name: "Purchased Electricity", description: "Electricity from grid or suppliers", position: 1 },
    { scopeId: getScopeId("Scope 2"), name: "Purchased Heating", description: "Steam, heat and cooling purchased", position: 2 },

    // Scope 3 Categories
    { scopeId: getScopeId("Scope 3"), name: "Transportation & Distribution", description: "Transportation of goods and materials", position: 1 },
    { scopeId: getScopeId("Scope 3"), name: "Purchased Goods & Materials", description: "Raw materials, components, and packaging", position: 2 },
    { scopeId: getScopeId("Scope 3"), name: "Business Travel", description: "Employee travel for business purposes", position: 3 },
    { scopeId: getScopeId("Scope 3"), name: "Employee Commuting", description: "Employee travel between home and work", position: 4 },
    { scopeId: getScopeId("Scope 3"), name: "Waste Disposal", description: "Treatment and disposal of waste", position: 5 },
    { scopeId: getScopeId("Scope 3"), name: "Leased Assets", description: "Assets operated by the organization but owned by others", position: 6 },
    { scopeId: getScopeId("Scope 3"), name: "Outsourced Services", description: "Services provided by third parties", position: 7 },
  ].map(c => ({
    id: randomUUID(),
    ...c,
    slug: slugify(c.name, { lower: true, strict: true }),
  }));

  await db.insert(category).values(categoriesData);
  console.log("✅ Categories inserted");

  const getCategoryId = (name: string) =>
    categoriesData.find(c => c.name === name)?.id ?? "";

  // --- 3. SubCategories ---
  const subCategoriesData = [
    // Stationary Combustion
    { 
      categoryId: getCategoryId("Stationary Combustion"), 
      name: "Natural Gas Boilers", 
      description: "Stationary combustion using natural gas",
      requiresFuelType: true,
      position: 1
    },
    { 
      categoryId: getCategoryId("Stationary Combustion"), 
      name: "Diesel Generators", 
      description: "Backup power generators using diesel",
      requiresFuelType: true,
      position: 2
    },
    { 
      categoryId: getCategoryId("Stationary Combustion"), 
      name: "Coal Boilers", 
      description: "Industrial boilers using coal",
      requiresFuelType: true,
      position: 3
    },

    // Mobile Combustion
    { 
      categoryId: getCategoryId("Mobile Combustion"), 
      name: "Company Vehicles", 
      description: "Owned or leased company cars and trucks",
      requiresFuelType: true,
      requiresTransportDetails: true,
      position: 1
    },
    { 
      categoryId: getCategoryId("Mobile Combustion"), 
      name: "Construction Equipment", 
      description: "Mobile construction machinery",
      requiresFuelType: true,
      requiresTransportDetails: true,
      position: 2
    },

    // Purchased Electricity
    { 
      categoryId: getCategoryId("Purchased Electricity"), 
      name: "Grid Electricity", 
      description: "Electricity from national grid",
      position: 1
    },
    { 
      categoryId: getCategoryId("Purchased Electricity"), 
      name: "Renewable Electricity", 
      description: "Certified renewable energy",
      position: 2
    },

    // Transportation & Distribution
    { 
      categoryId: getCategoryId("Transportation & Distribution"), 
      name: "Road Freight Transport", 
      description: "Goods transport by trucks",
      requiresTransportDetails: true,
      position: 1
    },
    { 
      categoryId: getCategoryId("Transportation & Distribution"), 
      name: "Sea Freight Transport", 
      description: "Goods transport by ships",
      requiresTransportDetails: true,
      position: 2
    },
    { 
      categoryId: getCategoryId("Transportation & Distribution"), 
      name: "Air Freight Transport", 
      description: "Goods transport by aircraft",
      requiresTransportDetails: true,
      position: 3
    },

    // Purchased Goods & Materials
    { 
      categoryId: getCategoryId("Purchased Goods & Materials"), 
      name: "Raw Materials", 
      description: "Basic materials used in production",
      requiresMaterialDetails: true,
      position: 1
    },
    { 
      categoryId: getCategoryId("Purchased Goods & Materials"), 
      name: "Packaging Materials", 
      description: "Materials used for product packaging",
      requiresMaterialDetails: true,
      position: 2
    },

    // Business Travel
    { 
      categoryId: getCategoryId("Business Travel"), 
      name: "Air Travel", 
      description: "Employee business flights",
      requiresTransportDetails: true,
      position: 1
    },
    { 
      categoryId: getCategoryId("Business Travel"), 
      name: "Car Rental", 
      description: "Rental vehicles for business trips",
      requiresTransportDetails: true,
      position: 2
    },

    // Waste Disposal
    { 
      categoryId: getCategoryId("Waste Disposal"), 
      name: "Municipal Waste", 
      description: "General non-hazardous waste",
      position: 1
    },
    { 
      categoryId: getCategoryId("Waste Disposal"), 
      name: "Hazardous Waste", 
      description: "Chemical and dangerous waste",
      position: 2
    },
  ].map(sc => ({
    id: randomUUID(),
    ...sc,
    slug: slugify(sc.name, { lower: true, strict: true }),
  }));

  await db.insert(subCategory).values(subCategoriesData);
  console.log("✅ SubCategories inserted");

  const getSubCategoryId = (name: string) =>
    subCategoriesData.find(sc => sc.name === name)?.id ?? "";

  // --- 4. Activity Types ---
  const activityTypesData = [
    // Natural Gas Boilers
    { subCategoryId: getSubCategoryId("Natural Gas Boilers"), name: "Natural Gas Consumption", defaultUnit: "m3" as UnitType, position: 1 },
    
    // Diesel Generators
    { subCategoryId: getSubCategoryId("Diesel Generators"), name: "Diesel Fuel Consumption", defaultUnit: "liter" as UnitType, position: 1 },
    
    // Grid Electricity
    { subCategoryId: getSubCategoryId("Grid Electricity"), name: "Electricity Consumption", defaultUnit: "kWh" as UnitType, position: 1 },
    
    // Renewable Electricity
    { subCategoryId: getSubCategoryId("Renewable Electricity"), name: "Green Electricity Consumption", defaultUnit: "kWh" as UnitType, position: 1 },
    
    // Road Freight Transport
    { subCategoryId: getSubCategoryId("Road Freight Transport"), name: "Truck Transport", defaultUnit: "ton_km" as UnitType, position: 1 },
    
    // Sea Freight Transport
    { subCategoryId: getSubCategoryId("Sea Freight Transport"), name: "Container Ship Transport", defaultUnit: "ton_km" as UnitType, position: 1 },
    
    // Air Freight Transport
    { subCategoryId: getSubCategoryId("Air Freight Transport"), name: "Cargo Aircraft Transport", defaultUnit: "ton_km" as UnitType, position: 1 },
    
    // Raw Materials
    { subCategoryId: getSubCategoryId("Raw Materials"), name: "Steel Consumption", defaultUnit: "kg" as UnitType, position: 1 },
    { subCategoryId: getSubCategoryId("Raw Materials"), name: "Aluminum Consumption", defaultUnit: "kg" as UnitType, position: 2 },
    { subCategoryId: getSubCategoryId("Raw Materials"), name: "Plastic Consumption", defaultUnit: "kg" as UnitType, position: 3 },
    
    // Air Travel
    { subCategoryId: getSubCategoryId("Air Travel"), name: "Domestic Flights", defaultUnit: "person_km" as UnitType, position: 1 },
    { subCategoryId: getSubCategoryId("Air Travel"), name: "International Flights", defaultUnit: "person_km" as UnitType, position: 2 },
    
    // Municipal Waste
    { subCategoryId: getSubCategoryId("Municipal Waste"), name: "Landfill Disposal", defaultUnit: "kg" as UnitType, position: 1 },
    { subCategoryId: getSubCategoryId("Municipal Waste"), name: "Recycling", defaultUnit: "kg" as UnitType, position: 2 },
  ].map(at => ({
    id: randomUUID(),
    ...at,
    slug: slugify(at.name, { lower: true, strict: true }),
  }));

  await db.insert(activityType).values(activityTypesData);
  console.log("✅ Activity Types inserted");

  const getActivityTypeId = (name: string) =>
    activityTypesData.find(at => at.name === name)?.id ?? "";

  // --- 5. Emission Factors ---
  const emissionFactorsData = [
    // Natural Gas
    {
      activityTypeName: "Natural Gas Consumption",
      fuelType: "natural_gas" as FuelType,
      gasType: "CO2",
      value: "2.02",
      unit: "kgCO2e/m³",
      source: "IPCC 2006",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "Natural Gas Consumption",
      fuelType: "natural_gas" as FuelType,
      gasType: "CH4",
      value: "0.0005",
      unit: "kgCO2e/m³",
      source: "IPCC 2006",
      year: 2023,
      region: "Global"
    },

    // Diesel
    {
      activityTypeName: "Diesel Fuel Consumption",
      fuelType: "diesel" as FuelType,
      gasType: "CO2",
      value: "2.68",
      unit: "kgCO2e/liter",
      source: "IPCC 2006",
      year: 2023,
      region: "Global"
    },

    // Grid Electricity
    {
      activityTypeName: "Electricity Consumption",
      gasType: "CO2",
      value: "0.418",
      unit: "kgCO2e/kWh",
      source: "National Grid Average",
      year: 2023,
      region: "Global"
    },

    // Renewable Electricity
    {
      activityTypeName: "Green Electricity Consumption",
      gasType: "CO2",
      value: "0.05",
      unit: "kgCO2e/kWh",
      source: "Green Energy Registry",
      year: 2023,
      region: "Global"
    },

    // Transportation
    {
      activityTypeName: "Truck Transport",
      transportType: "road",
      vehicleType: "heavy_truck",
      gasType: "CO2",
      value: "0.12",
      unit: "kgCO2e/ton-km",
      source: "DEFRA 2023",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "Container Ship Transport",
      transportType: "marine",
      vehicleType: "ship",
      gasType: "CO2",
      value: "0.015",
      unit: "kgCO2e/ton-km",
      source: "IMO 2023",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "Cargo Aircraft Transport",
      transportType: "air",
      vehicleType: "aircraft",
      gasType: "CO2",
      value: "0.5",
      unit: "kgCO2e/ton-km",
      source: "ICAO 2023",
      year: 2023,
      region: "Global"
    },

    // Materials
    {
      activityTypeName: "Steel Consumption",
      gasType: "CO2",
      value: "2.5",
      unit: "kgCO2e/kg",
      source: "Ecoinvent 3.0",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "Aluminum Consumption",
      gasType: "CO2",
      value: "8.1",
      unit: "kgCO2e/kg",
      source: "Ecoinvent 3.0",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "Plastic Consumption",
      gasType: "CO2",
      value: "3.5",
      unit: "kgCO2e/kg",
      source: "Ecoinvent 3.0",
      year: 2023,
      region: "Global"
    },

    // Air Travel
    {
      activityTypeName: "Domestic Flights",
      transportType: "air",
      gasType: "CO2",
      value: "0.18",
      unit: "kgCO2e/person-km",
      source: "DEFRA 2023",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "International Flights",
      transportType: "air",
      gasType: "CO2",
      value: "0.15",
      unit: "kgCO2e/person-km",
      source: "DEFRA 2023",
      year: 2023,
      region: "Global"
    },

    // Waste
    {
      activityTypeName: "Landfill Disposal",
      gasType: "CH4",
      value: "0.8",
      unit: "kgCO2e/kg",
      source: "IPCC Waste Guidelines",
      year: 2023,
      region: "Global"
    },
    {
      activityTypeName: "Recycling",
      gasType: "CO2",
      value: "0.1",
      unit: "kgCO2e/kg",
      source: "IPCC Waste Guidelines",
      year: 2023,
      region: "Global"
    },
  ].map(ef => ({
    id: randomUUID(),
    activityTypeId: getActivityTypeId(ef.activityTypeName),
    fuelType: ef.fuelType as any,
    transportType: ef.transportType as any,
    vehicleType: ef.vehicleType as any,
    gasType: ef.gasType,
    value: ef.value,
    unit: ef.unit,
    source: ef.source,
    year: ef.year,
    region: ef.region,
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