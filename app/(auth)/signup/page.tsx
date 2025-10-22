import { auth } from "@/lib/auth";
import SignUp from "./_components/sign-up";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth.api.getSession ({
    headers: await headers(),
  })
  if (session) {
    return redirect("/");
  }
  return (
    <SignUp />
  )
}
