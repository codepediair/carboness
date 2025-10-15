import * as dotenv from 'dotenv'
dotenv.config()
import fs from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import {
  scope, category, subCategory, activityType,
  fuelType, transportType, vehicleType, wasteType,
  emissionFactor
} from "@/db/schema/schema";
import slugify from "slugify";

// Create a local DB instance from DATABASE_URL to avoid importing `env` which
// runs full environment validation (useful when running standalone seed scripts).
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable. Set it in your .env before running the seed.");
  process.exit(1);
}

const db = drizzle(DATABASE_URL);

// ---- Types ----
type StructureJSON = {
  scope: {
    name: string;
    slug: string;
    description?: string;
  };
  categories: {
    name: string;
    slug: string;
    description?: string;
    subCategories: {
      name: string;
      slug: string;
      description?: string;
      requiresFuelType?: boolean;
      requiresTransportDetails?: boolean;
      requiresMaterialDetails?: boolean;
      activityTypes: {
        name: string;
        slug: string;
        description?: string;
        defaultUnit: string;
      }[];
    }[];
  }[];
}[];

type LookupItem = { name: string; slug: string; };

type EmissionFactorJSON = {
  activitySlug: string;
  fuelSlug?: string;
  transportSlug?: string;
  vehicleSlug?: string;
  gasType: string; // "CO2" | "CH4" | "N2O" (free text supported)
  value: number;   // numeric EF value
  unit: string;    // e.g., "kgCO2e/kWh"
  source: string;  // "IPCC 2021"
  year?: number;
  region?: string;
}[];

type DefaultUnitJSON = {
  activitySlug: string;
  defaultUnit: string;
}[];


// ---- Helpers ----
async function loadJson<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Upsert a lookup item by slug (fuelType, transportType, vehicleType, wasteType).
 * If exists, skip insert. Returns the row id.
 */
async function upsertLookup<TTable extends { slug: any; id: any }>(
  table: TTable,
  slugColumn: any,
  values: { name: string; slug: string; }
): Promise<string> {
  const existing = await db.select().from(table as any).where(eq(slugColumn, values.slug)).limit(1);
  if (existing.length > 0) return (existing[0] as any).id;

  const result = await db.insert(table as any).values(values).returning();
  const inserted = Array.isArray(result) ? result[0] : null;
  return (inserted as any).id;
}

/**
 * Upsert scope by slug.
 */
async function upsertScope(values: { name: string; slug: string; description?: string; position?: number }) {
  const existing = await db.select().from(scope).where(eq(scope.slug, values.slug)).limit(1);
  if (existing.length > 0) return existing[0].id;

  const [inserted] = await db.insert(scope).values(values).returning();
  return inserted.id;
}

/**
 * Upsert category by slug + scopeId.
 */
async function upsertCategory(values: { scopeId: string; name: string; slug: string; description?: string; position?: number }) {
  const existing = await db.select().from(category).where(eq(category.slug, values.slug)).limit(1);
  if (existing.length > 0) return existing[0].id;

  const [inserted] = await db.insert(category).values(values).returning();
  return inserted.id;
}

/**
 * Upsert subCategory by slug + categoryId.
 */
async function upsertSubCategory(values: {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  requiresFuelType?: boolean;
  requiresTransportDetails?: boolean;
  requiresMaterialDetails?: boolean;
  position?: number;
}) {
  const existing = await db.select().from(subCategory).where(eq(subCategory.slug, values.slug)).limit(1);
  if (existing.length > 0) return existing[0].id;

  const [inserted] = await db.insert(subCategory).values(values).returning();
  return inserted.id;
}

/**
 * Upsert activityType by slug + subCategoryId.
 */
async function upsertActivityType(values: {
  subCategoryId: string;
  name: string;
  slug: string;
  description?: string;
  defaultUnit: string;
  position?: number;
}) {
  const existing = await db.select().from(activityType).where(eq(activityType.slug, values.slug)).limit(1);
  if (existing.length > 0) {
    // Optional: update defaultUnit if changed
    const current = existing[0];
    if (values.defaultUnit && current.defaultUnit !== values.defaultUnit) {
      await db.update(activityType)
        .set({ defaultUnit: values.defaultUnit })
        .where(eq(activityType.id, current.id));
    }
    return existing[0].id;
  }

  const [inserted] = await db.insert(activityType).values(values).returning();
  return inserted.id;
}

/**
 * Fetch id by slug from a lookup table. Returns null if not found or slug not provided.
 */
async function getLookupIdBySlug<TTable extends { slug: any; id: any }>(
  table: TTable,
  slugColumn: any,
  slug?: string
): Promise<string | null> {
  if (!slug) return null;
  const rows = await db.select().from(table as any).where(eq(slugColumn, slug)).limit(1);
  return rows.length ? (rows[0] as any).id : null;
}

/**
 * Simple CSV parser that handles quoted fields and returns array of records.
 */
function parseCsv(csv: string) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const header = splitCsvLine(lines[0]);
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    // skip if number of cols doesn't match header
    if (cols.length === 0) continue;
    const obj: Record<string, string> = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = cols[j] ?? "";
    }
    rows.push(obj);
  }
  return rows;
}

function splitCsvLine(line: string) {
  const result: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      result.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  result.push(cur);
  return result.map(s => s.trim());
}

async function seedFromCsv() {
  console.log("🌱 Starting CSV seed from db/schema/data.csv...");
  const csvPath = path.join(process.cwd(), "db", "schema", "data.csv");
  const raw = await fs.readFile(csvPath, "utf-8");
  const rows = parseCsv(raw);

  let createdScopes = 0;
  let createdCategories = 0;
  let createdSubCategories = 0;
  let createdActivities = 0;

  // track seen slugs to avoid duplicate DB queries
  const seenScopes = new Map<string, string>();
  const seenCategories = new Map<string, string>();
  const seenSubCategories = new Map<string, string>();
  const seenActivities = new Map<string, string>();

  for (const r of rows) {
    const scopeSlug = (r.scope || "").trim();
    const scopeName = (r.scope_name || scopeSlug).trim();
    if (!scopeSlug) continue;

    let scopeId = seenScopes.get(scopeSlug);
    if (!scopeId) {
      scopeId = await upsertScope({ name: scopeName, slug: scopeSlug, description: r.description });
      seenScopes.set(scopeSlug, scopeId);
      createdScopes++;
    }

    const categoryName = (r.category || "").trim();
    if (!categoryName) continue;
    const categorySlug = slugify(categoryName, { lower: true, strict: true });
    const catKey = `${scopeSlug}::${categorySlug}`;
    let categoryId = seenCategories.get(catKey);
    if (!categoryId) {
      categoryId = await upsertCategory({ scopeId, name: categoryName, slug: categorySlug, description: r.description, position: Number(r.position) || 0 });
      seenCategories.set(catKey, categoryId);
      createdCategories++;
    }

    const subName = (r.sub_category || "").trim();
    if (!subName) continue;
    const subSlug = slugify(subName, { lower: true, strict: true });
    const subKey = `${categoryId}::${subSlug}`;
    let subId = seenSubCategories.get(subKey);
    if (!subId) {
      const requiresFuelType = String(r.requires_fuel_type || "").toLowerCase() === "true";
      const requiresTransportDetails = String(r.requires_transport_details || "").toLowerCase() === "true";
      const requiresMaterialDetails = String(r.requires_material_details || "").toLowerCase() === "true";
      subId = await upsertSubCategory({
        categoryId,
        name: subName,
        slug: subSlug,
        description: r.description,
        requiresFuelType,
        requiresTransportDetails,
        requiresMaterialDetails,
        position: Number(r.position) || 0,
      });
      seenSubCategories.set(subKey, subId);
      createdSubCategories++;
    }

    const activityName = (r.activity_type || "").trim();
    if (!activityName) continue;
    const activitySlug = slugify(activityName, { lower: true, strict: true });
    const actKey = `${subId}::${activitySlug}`;
    if (!seenActivities.has(actKey)) {
      const defaultUnit = (r.default_unit || "").trim();
      await upsertActivityType({ subCategoryId: subId, name: activityName, slug: activitySlug, description: r.description, defaultUnit, position: Number(r.position) || 0 });
      seenActivities.set(actKey, "1");
      createdActivities++;
    }
  }

  console.log(`✅ Scopes upserted: ${createdScopes}`);
  console.log(`✅ Categories upserted: ${createdCategories}`);
  console.log(`✅ SubCategories upserted: ${createdSubCategories}`);
  console.log(`✅ ActivityTypes upserted: ${createdActivities}`);
  console.log("🌱 CSV seed completed successfully!");
}

// Run when executed directly
if (require.main === module) {
  seedFromCsv().catch(err => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
}