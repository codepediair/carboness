import { db } from "@/db/drizzle";
import { userInput } from "@/db/schema/schema";
import { userInputSchema } from "@/lib/zodSchema";
import { authClient } from "@/lib/auth-client";
import { InferInsertModel } from "drizzle-orm";

type NewUserInput = InferInsertModel<typeof userInput>;

export async function POST(req: Request) {
  try {
    // بررسی لاگین بودن کاربر
    const { data: session } = await authClient.getSession();
    // if (!session?.user?.id) {
    //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
    //     status: 401,
    //     headers: { "Content-Type": "application/json" },
    //   });
    // }

    // گرفتن داده از body
    const body = await req.json();
    const parsed = userInputSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ errors: parsed.error.format() }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // آماده‌سازی داده برای درج
    const data: NewUserInput = {
      ...parsed.data,
      userId: session?.user?.id ?? "fkieu7mYbJ1nZYYaUfQU9Zwmahji2AF4",
    };

    // درج در دیتابیس
    const [row] = await db.insert(userInput).values(data).returning();

    return new Response(JSON.stringify(row), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
