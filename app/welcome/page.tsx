import { CreateBotConfigForm } from "@/components/forms/create-config-form";
import { CreateProfileForm } from "@/components/forms/create-profile-form";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ConfigFormValues, IntegrationFormValues, ProfileFormValues } from "@/lib/form-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Api } from "@/lib/api";
import { UpdateIntegrationForm } from "@/components/forms/integrations-form";

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

  if (userProfile) {
    redirect("/dashboard/");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    // create user in db
    const new_user = await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });

    //create bot in db
    Api.post("phone/buy", { user_id: new_user.id })
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
  }

  async function createProfile(data: ProfileFormValues) {
    "use server";
    try {
      await db.profile
        .create({
          data: {
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
        .create({
          data: {
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

  async function updateBot(data: IntegrationFormValues) {
    "use server";
    try {
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
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  return (
    <>
      <div className="space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading
            title="Welcome to ZaplineAI"
            description="Before you get started, please take a moment to fill the necessary information for the bot to function."
          />
        </div>
        <Separator />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <Heading title="Step 1 - Setup your profile" description="" />
          <p className="text-foreground text-md">
            Personalize your bot by providing essential details about your
            brand. <br className="hidden md:block" />
            Enter your brand name, website, type of business, and a dedicated
            support email. This information helps the bot tailor responses and
            enhance the user experience.
          </p>
          <CreateProfileForm createProfile={createProfile} />
          <Separator />
          <Heading title="Step 2 - Bot Configuration" description="" />
          <p className="text-foreground text-md">
            {" "}
            Customize how the bot handles various scenarios.{" "}
            <br className="hidden md:block" />
            1. Specify a transfer number for situations beyond the bot&apos;s
            capabilities. {"(Not Required)"}
            <br className="hidden md:block" />
            2. Toggle fallback mode to direct calls to voicemail when no live
            call representative is available, and set a fallback email to
            receive the voicemail transcriptions in such instances.{" "}
          </p>
          <CreateBotConfigForm createConfig={createConfig} />
          <Separator />
          <Heading title="Step 3 - Connect to Shopify" description="" />
          <p className="text-foreground text-md">
            Connect your bot to Shopify to automate order tracking, customer
            support, and more.{" "}
            <br className="hidden md:block" />
            Enter your Shopify store name and API key to enable the bot to
            access your store&apos;s data.
          </p>
          <UpdateIntegrationForm
            updateIntegration={updateBot}
            defaultValues={userProfile}
          />
          <Separator />
          <p className="text-foreground text-md">
            Once you&apos;ve completed the form, you can start using the bot.{" "}
          </p>
          <Link
            className={buttonVariants({
              variant: "default",
            })}
            href="/dashboard/"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
