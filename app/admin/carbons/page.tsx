import { auth } from "@/lib/auth";
import * as React from "react";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function CarbonCategoryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session === null) {
    return redirect("/login");
  }
  return <div className="flex flex-row">Carbons Statics Page</div>;
}
