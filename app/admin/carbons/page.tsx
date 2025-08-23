import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CarbonsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Carbons</h1>

        <Link className={buttonVariants()} href="/admin/carbons/create">Create Carbon</Link>
      </div>

      <div>
        <h1>Here you will see all of the carbons</h1>
      </div>
    </>
  )
}
