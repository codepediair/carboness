import { db } from "@/db/drizzle";
import { activityTypes } from "@/db/schema/schema";

export const activityTypesSeed = [
  // Sabit Yanma (Stationary Combustion)
  {
    title: "Boilers",
    unit: "m3",
    emissionFactor: 0,
    emissionSourceId: "8465a98b-8968-4761-808b-4b9382b07261",
    description: "",
  },
  {
    title: "Natural Gas Boiler",
    unit: "m3",
    emissionFactor: 0,
    emissionSourceId: "8465a98b-8968-4761-808b-4b9382b07261",
    description: "",
  },
  {
    title: "Coal-Fired Boiler",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "8465a98b-8968-4761-808b-4b9382b07261",
    description: "",
  },
  {
    title: "Fuel Oil / Diesel Boiler",
    unit: "litre",
    emissionFactor: 0,
    emissionSourceId: "8465a98b-8968-4761-808b-4b9382b07261",
    description: "",
  },
  {
    title: "Biomass Boiler",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "8465a98b-8968-4761-808b-4b9382b07261",
    description: "",
  },
  {
    title: "Other Boiler",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "8465a98b-8968-4761-808b-4b9382b07261",
    description: "",
  },

  {
    title: "Generators",
    unit: "kWh",
    emissionFactor: 0,
    emissionSourceId: "c079b7ed-6256-4814-a24b-a765db534337",
    description: "",
  },
  {
    title: "Diesel Generator",
    unit: "kWh",
    emissionFactor: 0,
    emissionSourceId: "c079b7ed-6256-4814-a24b-a765db534337",
    description: "",
  },
  {
    title: "Natural Gas Generator",
    unit: "kWh",
    emissionFactor: 0,
    emissionSourceId: "c079b7ed-6256-4814-a24b-a765db534337",
    description: "",
  },
  {
    title: "LPG Generator",
    unit: "kWh",
    emissionFactor: 0,
    emissionSourceId: "c079b7ed-6256-4814-a24b-a765db534337",
    description: "",
  },
  {
    title: "Other Generator",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "c079b7ed-6256-4814-a24b-a765db534337",
    description: "",
  },

  {
    title: "Cogeneration / Trigeneration Systems",
    unit: "kWh",
    emissionFactor: 0,
    emissionSourceId: "6f567311-49f9-49e8-8336-4e84fba94a01",
    description: "",
  },
  {
    title: "Process Heaters and Furnaces",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "73e0ffb3-f04a-44b7-ac10-b402235e052c",
    description: "",
  },
  {
    title: "Turbines and Engines (Stationary)",
    unit: "kWh",
    emissionFactor: 0,
    emissionSourceId: "35a70309-e6c2-4ab6-8758-71ea0778641a",
    description: "",
  },
  {
    title: "Other Stationary Combustion Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "c755c7ae-bd84-451f-a692-7509cacd8d27",
    description: "",
  },
  {
    title: "Other Equipment",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "9125f118-72e3-40af-86d5-620d0d604264",
    description: "",
  },

  // Hareketli Yanma (Mobile Combustion)
  {
    title: "Road Transportation",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },
  {
    title: "Light-Duty Passenger Cars",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },
  {
    title: "Light Commercial Vehicles / Vans",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },
  {
    title: "Heavy Duty Trucks",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },
  {
    title: "Buses / Shuttles",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },
  {
    title: "Motorcycles / Scooters",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },
  {
    title: "Other Road Vehicles",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description: "",
  },

  {
    title: "Off-Road / Non-Road Mobile Equipment",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "026646f6-aac2-41ca-8794-12ab6529bcc1",
    description: "",
  },
  {
    title: "Rail Transportation",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "b83bf0f1-8956-494c-92b1-9b3dac549cf6",
    description: "",
  },
  {
    title: "Marine Transportation",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "82f34f0e-1e20-4da6-b82b-07e3d2190707",
    description: "",
  },
  {
    title: "Aviation",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "162a7c81-5a41-476a-8b71-ac5be69d284a",
    description: "",
  },
  {
    title: "Other Mobile Combustion Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "86cd4d45-c81d-480c-bbf4-84949937f6fd",
    description: "",
  },

  // Industrial Processes
  {
    title: "Mineral Industries",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "cde3361b-d6c2-465b-a4f7-559f4a59e29c",
    description: "",
  },
  {
    title: "Metallurgical Industries",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "7d36ea74-adcb-4e06-ab3e-f196fdf5ec9e",
    description: "",
  },
  {
    title: "Chemical Industries",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "39fa68de-9cbf-49a5-b9a8-2b85c429e7a5",
    description: "",
  },
  {
    title: "Fluorinated Gases and Others",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "39bcca48-7fbc-45cc-a5d5-dbb41b9f95d4",
    description: "",
  },
  {
    title: "Removals",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "5317d59a-919d-4a3c-b049-bd8d6a89ae79",
    description: "",
  },

  // Anthropogenic / Fugitive Emissions
  {
    title: "Fuel Production and Distribution",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "dfde3e80-3f25-404f-b7d3-de229b4df248",
    description: "",
  },
  {
    title: "Solid Fuel Processing",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "9caa984e-2c0c-4e7d-8491-529e7372da87",
    description: "",
  },
  {
    title: "Industrial Gas Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "d1636db1-5b4b-47a1-afe1-65b5c6ba7f8c",
    description: "",
  },
  {
    title: "Waste Management Leakage Sources",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "3a2b5176-68b1-4a3a-aaca-dd3bec088c20",
    description: "",
  },
  {
    title: "Carbon Capture and Storage Systems (CCS)",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "1a855385-ac8b-4f98-9fb2-9524e45d235a",
    description: "",
  },
  {
    title: "Refrigeration and Air Conditioning Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "021c6b48-6acd-4b14-9d11-c7920768f7e4",
    description: "",
  },

  // LULUCF Activities
  {
    title: "Land-Use Changes",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "0ed2d328-05a1-4727-8c5b-0313372216ac",
    description: "",
  },
  {
    title: "Agricultural Lands",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "55524aa7-1cd0-4128-87d5-2a271e156511",
    description: "",
  },
  {
    title: "Grasslands and Pastures",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "4e85882a-a296-41cd-b83e-8b4b79ebd417",
    description: "",
  },
  {
    title: "Forests and Forest Management",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "c2246cdb-6185-4436-b188-96c2e1e4bbaa",
    description: "",
  },
  {
    title: "Wetlands and Special Areas",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "1e1b081c-5368-4d4d-ba44-22e3907bd6b9",
    description: "",
  },
  {
    title: "Product and Biomass Usage",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "e57b3f5d-0c7d-4e55-b019-94773c44de0e",
    description: "",
  },
  {
    title: "Light-duty Passenger Cars",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description:
      "Fleet management: Define vehicle profile (type, fuel, year, avg. consumption). CO₂e calculated per km.",
  },
  {
    title: "Light Commercial Vehicles / Vans",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description:
      "Fuel consumption imported automatically from invoices. CO₂e calculated per km.",
  },
  {
    title: "Heavy Duty Trucks",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description:
      "Ton-km based reporting for transport clients. Includes corporate vs third-party vehicles.",
  },
  {
    title: "Buses / Shuttles",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description:
      "City/intercity buses, CO₂e per ton-km. Supports fleet telematics integration.",
  },
  {
    title: "Motorcycles / Scooters",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description:
      "Two-wheeled vehicles, CO₂e per km. Optional biogenic reporting toggle for biofuels.",
  },
  {
    title: "Other Road Vehicles",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "d2ba583b-4157-4a9b-98a8-42f953f21c73",
    description:
      "Other road vehicles, CO₂e calculated per km or L/100km assumptions.",
  },
  {
    title: "Off-Road / Non-Road Mobile Equipment",
    unit: "km",
    emissionFactor: 0,
    emissionSourceId: "026646f6-aac2-41ca-8794-12ab6529bcc1",
    description:
      "Construction, agriculture, industrial equipment. CO₂e per km or operation hour.",
  },
  {
    title: "Rail Transportation",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "b83bf0f1-8956-494c-92b1-9b3dac549cf6",
    description: "Diesel locomotives and others. CO₂e per ton-km transported.",
  },
  {
    title: "Marine Transportation",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "82f34f0e-1e20-4da6-b82b-07e3d2190707",
    description:
      "Coastal and ocean vessels, ferries. CO₂e per ton-km cargo/passenger.",
  },
  {
    title: "Aviation",
    unit: "ton-km",
    emissionFactor: 0,
    emissionSourceId: "162a7c81-5a41-476a-8b71-ac5be69d284a",
    description:
      "Commercial flights (owned/operated). Kapsam-1 for company planes, Kapsam-3 for employee flights.",
  },
  {
    title: "Other Mobile Combustion Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "86cd4d45-c81d-480c-bbf4-84949937f6fd",
    description:
      "Mobile generators, portable heaters, mobile catering equipment. User-defined emissions input.",
  },
  // Mineral Industries
  {
    title: "Cement Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "cde3361b-d6c2-465b-a4f7-559f4a59e29c",
    description:
      "CO₂e calculated per ton of cement produced based on process type → sub-category → input quantity.",
  },
  {
    title: "Lime Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "cde3361b-d6c2-465b-a4f7-559f4a59e29c",
    description:
      "CO₂e calculated per ton of lime produced, using process-specific emission factors.",
  },
  {
    title: "Glass Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "cde3361b-d6c2-465b-a4f7-559f4a59e29c",
    description:
      "CO₂e per ton of glass produced. Process → sub-category → input quantity used for calculation.",
  },
  {
    title: "Ceramics Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "cde3361b-d6c2-465b-a4f7-559f4a59e29c",
    description: "CO₂e per ton of ceramic materials produced.",
  },
  {
    title: "Other Mineral Products",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "cde3361b-d6c2-465b-a4f7-559f4a59e29c",
    description:
      "Other mineral industry processes. User-defined emission input possible.",
  },

  // Metallurgical Industries
  {
    title: "Iron and Steel Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "7d36ea74-adcb-4e06-ab3e-f196fdf5ec9e",
    description:
      "CO₂e calculated per ton of steel/iron produced, based on process type.",
  },
  {
    title: "Primary Aluminum Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "7d36ea74-adcb-4e06-ab3e-f196fdf5ec9e",
    description:
      "CO₂e per ton of aluminum produced using emission factors for primary production.",
  },
  {
    title: "Magnesium Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "7d36ea74-adcb-4e06-ab3e-f196fdf5ec9e",
    description: "CO₂e per ton of magnesium produced.",
  },
  {
    title: "Other Metals (Lead, Zinc, Nickel)",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "7d36ea74-adcb-4e06-ab3e-f196fdf5ec9e",
    description:
      "CO₂e per ton of metals produced. User-defined sub-category input possible.",
  },

  // Chemical Industries
  {
    title: "Ammonia Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "39fa68de-9cbf-49a5-b9a8-2b85c429e7a5",
    description:
      "CO₂e per ton of ammonia produced, using process-specific emission factors.",
  },
  {
    title: "Nitric Acid Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "39fa68de-9cbf-49a5-b9a8-2b85c429e7a5",
    description: "CO₂e per ton of nitric acid produced.",
  },
  {
    title: "Adipic Acid Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "39fa68de-9cbf-49a5-b9a8-2b85c429e7a5",
    description: "CO₂e per ton of adipic acid produced.",
  },
  {
    title: "Carbide / Carbon Black Production",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "39fa68de-9cbf-49a5-b9a8-2b85c429e7a5",
    description: "CO₂e per ton of carbide or carbon black produced.",
  },
  {
    title: "Ethylene Oxide, Caprolactam, etc.",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "39fa68de-9cbf-49a5-b9a8-2b85c429e7a5",
    description: "CO₂e per ton of chemical produced.",
  },

  // Fluorinated Gases and Others
  {
    title: "Refrigerant Production / Release",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "39bcca48-7fbc-45cc-a5d5-dbb41b9f95d4",
    description:
      "CO₂e calculated for fluorinated gases and other relevant chemical emissions.",
  },
  {
    title: "Electrical Equipment",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "39bcca48-7fbc-45cc-a5d5-dbb41b9f95d4",
    description: "CO₂e from production and operation of electrical equipment.",
  },
  {
    title: "Other Fluorinated / Industrial Emissions",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "39bcca48-7fbc-45cc-a5d5-dbb41b9f95d4",
    description: "Other F-gas emissions or user-defined industrial emissions.",
  },

  // Removals
  {
    title: "Carbon Capture and Storage (CCS)",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "5317d59a-919d-4a3c-b049-bd8d6a89ae79",
    description:
      "CO₂ sequestration via CCS, mineralization, or biochemical processes.",
  },
  {
    title: "Mineralization / Chemical Binding",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "5317d59a-919d-4a3c-b049-bd8d6a89ae79",
    description: "CO₂ captured via mineralization or chemical binding.",
  },
  {
    title: "Biochemical Processes",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "5317d59a-919d-4a3c-b049-bd8d6a89ae79",
    description: "CO₂ captured via biochemical processes.",
  },
  {
    title: "Other Removals",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "5317d59a-919d-4a3c-b049-bd8d6a89ae79",
    description: "Other CO₂ removal processes defined by the user.",
  },

  // Fuel Production and Distribution
  {
    title: "Oil and Gas Extraction",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "dfde3e80-3f25-404f-b7d3-de229b4df248",
    description:
      "CO₂e calculated per ton of fuel extracted, including wellhead, flare, venting, and other sources.",
  },
  {
    title: "Oil Refinery Operations",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "dfde3e80-3f25-404f-b7d3-de229b4df248",
    description:
      "CO₂e per ton of refined oil. Includes storage tanks, pumps, pipelines, and other refinery operations.",
  },
  {
    title: "Natural Gas Transmission and Distribution",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "dfde3e80-3f25-404f-b7d3-de229b4df248",
    description:
      "CO₂e for compression, pipeline leaks, and other transmission/distribution processes.",
  },
  {
    title: "Other Fuel Production Sources",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "dfde3e80-3f25-404f-b7d3-de229b4df248",
    description:
      "Other fuel production sources. User-defined emission input possible.",
  },

  // Solid Fuel Processing
  {
    title: "Coal Mining",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "9caa984e-2c0c-4e7d-8491-529e7372da87",
    description:
      "CO₂e per ton of coal mined, including gas emissions from underground mines.",
  },
  {
    title: "Coal Storage and Transportation",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "9caa984e-2c0c-4e7d-8491-529e7372da87",
    description: "CO₂e from coal storage yards and transportation activities.",
  },
  {
    title: "Other Solid Fuel Processes",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "9caa984e-2c0c-4e7d-8491-529e7372da87",
    description:
      "Other solid fuel handling or processing emissions. User-defined input possible.",
  },

  // Refrigeration and Air Conditioning Systems
  {
    title: "Stationary Refrigeration / Cooling",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "021c6b48-6acd-4b14-9d11-c7920768f7e4",
    description:
      "CO₂e per system based on refrigerant type and leakage amount.",
  },
  {
    title: "Portable / Mobile Cooling",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "021c6b48-6acd-4b14-9d11-c7920768f7e4",
    description:
      "CO₂e for mobile cooling units, including vehicle AC or refrigerated transport.",
  },
  {
    title: "Other Refrigeration / AC Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "021c6b48-6acd-4b14-9d11-c7920768f7e4",
    description:
      "Other refrigeration or air conditioning emissions. User-defined input possible.",
  },

  // Industrial Gas Systems
  {
    title: "Electrical Equipment (SF₆ etc.)",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "d1636db1-5b4b-47a1-afe1-65b5c6ba7f8c",
    description:
      "CO₂e from SF₆ or other industrial gases used in electrical equipment.",
  },
  {
    title: "Fire Suppression Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "d1636db1-5b4b-47a1-afe1-65b5c6ba7f8c",
    description:
      "Emissions from chemical fire suppression systems (e.g., Halon, HFC) in industry.",
  },
  {
    title: "Process Gases",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "d1636db1-5b4b-47a1-afe1-65b5c6ba7f8c",
    description: "CO₂e from process gases at landfills or industrial sites.",
  },
  {
    title: "Other Industrial Gas Systems",
    unit: "unitless",
    emissionFactor: 0,
    emissionSourceId: "d1636db1-5b4b-47a1-afe1-65b5c6ba7f8c",
    description: "Other industrial gas emissions, user-defined input possible.",
  },

  // Waste Management Leakage Sources
  {
    title: "Solid Waste Sites",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "3a2b5176-68b1-4a3a-aaca-dd3bec088c20",
    description: "CO₂e from solid waste landfill emissions.",
  },
  {
    title: "Wastewater Treatment",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "3a2b5176-68b1-4a3a-aaca-dd3bec088c20",
    description:
      "CO₂e from wastewater treatment processes (aeration, sludge decomposition).",
  },
  {
    title: "Other Waste Management Emissions",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "3a2b5176-68b1-4a3a-aaca-dd3bec088c20",
    description:
      "Other waste management leakage emissions. User-defined input possible.",
  },

  // Carbon Capture and Storage Systems (CCS)
  {
    title: "CO₂ Transport and Injection",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "1a855385-ac8b-4f98-9fb2-9524e45d235a",
    description: "CO₂ transported and injected for CCS.",
  },
  {
    title: "Other CCS Operations",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "1a855385-ac8b-4f98-9fb2-9524e45d235a",
    description: "Other CCS-related CO₂ capture and storage activities.",
  },

  // Land-Use Changes
  {
    title: "Deforestation",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "0ed2d328-05a1-4727-8c5b-0313372216ac",
    description:
      "CO₂e from deforestation. User selects land type → sub-category → activity. Area in ha required.",
  },
  {
    title: "Afforestation / Reforestation",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "0ed2d328-05a1-4727-8c5b-0313372216ac",
    description:
      "CO₂ sequestration from afforestation/reforestation activities.",
  },
  {
    title: "Agriculture ↔ Forest Conversion",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "0ed2d328-05a1-4727-8c5b-0313372216ac",
    description:
      "CO₂e from land conversion between agriculture and forest. Area input required.",
  },
  {
    title: "Other Land-Use Changes",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "0ed2d328-05a1-4727-8c5b-0313372216ac",
    description: "Other land-use change activities defined by the user.",
  },

  // Agricultural Lands
  {
    title: "Agricultural Soil Management",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "55524aa7-1cd0-4128-87d5-2a271e156511",
    description:
      "CO₂e from fertilizer application, tillage, and soil organic matter changes.",
  },
  {
    title: "Rice Fields",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "55524aa7-1cd0-4128-87d5-2a271e156511",
    description:
      "Methane and CO₂e emissions from rice cultivation. Area input required.",
  },
  {
    title: "Fallow Practices",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "55524aa7-1cd0-4128-87d5-2a271e156511",
    description: "CO₂e from leaving agricultural land fallow.",
  },
  {
    title: "Other Agricultural Activities",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "55524aa7-1cd0-4128-87d5-2a271e156511",
    description: "Other agricultural land activities defined by the user.",
  },

  // Grasslands and Pastures
  {
    title: "Grassland Conversion",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "4e85882a-a296-41cd-b83e-8b4b79ebd417",
    description: "CO₂e from conversion of grasslands. Area input required.",
  },
  {
    title: "Grassland Management",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "4e85882a-a296-41cd-b83e-8b4b79ebd417",
    description:
      "Emissions from fertilization, irrigation, and other grassland management activities.",
  },
  {
    title: "Other Grassland Activities",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "4e85882a-a296-41cd-b83e-8b4b79ebd417",
    description: "Other grassland-related activities defined by the user.",
  },

  // Forests and Forest Management
  {
    title: "Forest Harvesting",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "c2246cdb-6185-4436-b188-96c2e1e4bbaa",
    description:
      "CO₂e from forest harvest activities (logging, timber production).",
  },
  {
    title: "Forest Fires (Anthropogenic)",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "c2246cdb-6185-4436-b188-96c2e1e4bbaa",
    description: "CO₂e from anthropogenic forest fires.",
  },
  {
    title: "Forest Improvement and Maintenance",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "c2246cdb-6185-4436-b188-96c2e1e4bbaa",
    description:
      "CO₂e accounting for thinning, replanting, and forest maintenance activities.",
  },
  {
    title: "Other Forest Activities",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "c2246cdb-6185-4436-b188-96c2e1e4bbaa",
    description: "Other forest management activities defined by the user.",
  },

  // Wetlands and Special Areas
  {
    title: "Wetland Drainage",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "1e1b081c-5368-4d4d-ba44-22e3907bd6b9",
    description: "CO₂e from drainage of wetlands.",
  },
  {
    title: "Peatland Use",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "1e1b081c-5368-4d4d-ba44-22e3907bd6b9",
    description: "CO₂e from peatland conversion or use.",
  },
  {
    title: "Other Wetland Activities",
    unit: "ha",
    emissionFactor: 0,
    emissionSourceId: "1e1b081c-5368-4d4d-ba44-22e3907bd6b9",
    description: "Other wetland-related activities defined by the user.",
  },

  // Product and Biomass Usage
  {
    title: "Wood and Biomass Products",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "e57b3f5d-0c7d-4e55-b019-94773c44de0e",
    description:
      "CO₂e from wood and biomass products (fuelwood, lumber, pellets, other). User provides quantity in ton.",
  },
  {
    title: "Biomass Waste",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "e57b3f5d-0c7d-4e55-b019-94773c44de0e",
    description: "CO₂e from biomass waste disposal or processing.",
  },
  {
    title: "Other Biomass / Product Activities",
    unit: "ton",
    emissionFactor: 0,
    emissionSourceId: "e57b3f5d-0c7d-4e55-b019-94773c44de0e",
    description:
      "Other biomass or product-related activities. User-defined input possible.",
  },
];

export async function seedActivityTypes() {
  for (const item of activityTypesSeed) {
    await db.insert(activityTypes).values({
      title: item.title,
      description: item.description,
      unit: item.unit,
      emissionFactor: item.emissionFactor,
      emissionSourceId: item.emissionSourceId,
    });
  }
  console.log("✔ Activity Types seeded successfully.");
}
