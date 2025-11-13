import { auth } from "@/lib/auth";
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

  // Fetch emission input records from the database
  let emissionData = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/emission-inputs`,
      { cache: "no-store" }
    );
    const result = await response.json();
    console.log("[Admin Page] Fetched emission inputs:", result);
    
    if (result.success && result.data && Array.isArray(result.data)) {
      // Transform the data to match the DataTable schema
      emissionData = result.data.map((item: any, index: number) => ({
        id: index + 1,
        header: item.activityTitle || `Emission Input ${item.id}`,
        type: "Emission Input",
        status: "Done",
        target: item.inputValue || "0",
        limit: item.unit || "tCO2e",
        reviewer: item.userId || "System",
      }));
      console.log("[Admin Page] Transformed", emissionData.length, "records");
    } else {
      console.warn("[Admin Page] Response was not successful or missing data:", result);
    }
  } catch (error) {
    console.error("[Admin Page] Failed to fetch emission inputs:", error);
  }

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={emissionData} />
    </>
  );
}
