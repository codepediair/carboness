import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CarbonCreationPage() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href="/admin/carbons"
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create Carbon</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Basic information
          </CardTitle>
          <CardDescription>
            Basic information about your carbon footprint
          </CardDescription>
        </CardHeader>
        {/* <CardContent>

        </CardContent> */}
      </Card>
    </>
  );
}
