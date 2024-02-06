import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateProfileOne } from "@/components/forms/create-profile-form";
import { ConfigFormValues, ProfileFormValues } from "@/lib/form-schema";
import { CreateBotConfig } from "@/components/forms/create-config-form";

const breadcrumbItems = [{ title: "Config", link: "/dashboard/config" }];
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

  const userConfig = await db.config.findFirst({
    where: {
      userId: user?.id,
    },
  });

  async function createProfile(data: ProfileFormValues) {
    "use server";
    try {
      await db.profile
        .upsert({
          where: {
            userId: user?.id,
          },
          update: {
            ...data,
          },
          create: {
            ...data,
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  async function createConfig(data: ConfigFormValues) {
    "use server";
    try {
      await db.config
        .upsert({
          where: {
            userId: user?.id,
          },
          update: {
            ...data,
          },
          create: {
            ...data,
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
        })
        .then((res) => {
          console.log(res);
        });
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
          title="Configuration"
          description="Toggle various settings for your bot"
        />
        <Separator />

        <h1 className="text-foreground font-bold text-lg my-2">
          Brand Information
        </h1>
        <CreateProfileOne
          createProfile={createProfile}
          defaultValues={userProfile}
        />
        <Separator className="my-8" />
        <h1 className="text-foreground font-bold text-lg my-2">
          Bot Information
        </h1>
        <CreateBotConfig
          createConfig={createConfig}
          defaultValues={userConfig}
        />
      </div>
    </ScrollArea>
  );
}
