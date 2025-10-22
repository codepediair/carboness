import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CarbonCreatePage() {
  const session = await auth.api.getSession ({
    headers: await headers(),
  })
  if (session === null) {
    return redirect("/login");
  }
  return(
  <div className="flex flex-row">
    Carbons Create page
  </div>

  ) 
}
