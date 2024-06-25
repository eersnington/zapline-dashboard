import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function page() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user?.id || !user?.email) {
    redirect("/");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    // create user in db
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });

    await db.callStats.create({
      data: {
        user_id: user.id,
        total_calls: 0,
        total_automated: 0,
        total_transferred: 0,
        total_abandoned: 0,
      },
    });

    await db.call_logs.create({
      data: {
        user_id: user.id,
        call_data: JSON.stringify([]),
      },
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg shadow-md shadow-foreground p-4 md:p-8">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Welcome to ZaplineAI"
              description="Let's get started with setting up your AI assistant. Please fill in the necessary information to personalize your experience."
            />
          </div>
          <Link
            className={buttonVariants({
              variant: "default",
            })}
            href="/welcome/step1"
          >
            Get Started with Step 1
          </Link>
        </div>
      </div>
    </div>
  );

}
