import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { categories, subCategories, emissionSources } from "@/db/schema/schema";
import EmissionForm from "./_components/emissionForm";

export default async function CarbonCreatePage() {
  const cats = await db.query.categories.findMany({
    with: {
      subCategories: {
        with: {
          emissionSources: true,
        },
      },
    },
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session === null) {
    return redirect("/login");
  }
  return <EmissionForm categories={cats} />;
}
