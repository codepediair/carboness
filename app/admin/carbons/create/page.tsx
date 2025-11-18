import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { UserInputForm } from "./_components/userInputForm";

export default async function CarbonCreatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session === null) {
    return redirect("/login");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <UserInputForm currentUserId={session.user.id} />
    </div>
  );
}
