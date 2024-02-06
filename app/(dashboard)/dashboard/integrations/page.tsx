import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = [{ title: "Integrations", link: "/dashboard/integrations" }];
export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    redirect("/");
  }

  const userProfile = await db.profile.findFirst({
    where: {
      userId: user?.id,
    },
  });

  const userBot = await db.bot.findFirst({
    where: {
      userId: user?.id,
    },
  });

  async function updateBot() {}

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title="Integrations"
          description="Connect your bot to Shopify."
        />
        <Separator />

        <h1 className="text-foreground font-bold text-lg my-2">
          Shopify Information
        </h1>
      </div>
    </ScrollArea>
  );
}
