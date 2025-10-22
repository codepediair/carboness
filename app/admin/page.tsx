import { auth } from "@/lib/auth";
import data from "./data.json";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminIndexPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session === null) {
    return redirect("/login");
  }
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
