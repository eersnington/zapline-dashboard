import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpdateIntegrationForm } from "@/components/forms/integrations-form";
import { IntegrationFormValues } from "@/lib/form-schema";
import { Api } from "@/lib/api";

const breadcrumbItems = [
  { title: "Integrations", link: "/dashboard/integrations" },
];
export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    redirect("/");
  }

  const userBot = await db.bot.findFirst({
    where: {
      userId: user?.id,
    },
  });

  async function updateBot(data: IntegrationFormValues) {
    "use server";
    try {
      if (user) {
        if (userBot === null) {
          console.log("Creating bot")
          await Api.post("phone/buy", { user_id: user?.id })
            .then((res) => {
              console.log(res);
              Api.get("bots/add", {
                user_id: user?.id,
              }).catch((err) => {
                console.log(err);
              });
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("Bot created successfully");
        }
        await db.bot
          .update({
            where: {
              userId: user?.id,
            },
            data: {
              ...data,
            },
          })
          .then((res) => {
            console.log(res);
          });
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

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

        <UpdateIntegrationForm
          updateIntegration={updateBot}
          defaultValues={userBot}
        />
      </div>
    </ScrollArea>
  );
}
