import { CreateBotConfig } from "@/components/forms/create-config-form";
import { CreateProfileOne } from "@/components/forms/create-profile-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ConfigFormValues, ProfileFormValues } from "@/lib/form-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Api } from "@/lib/api";

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
    const new_user = await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });

    //create bot in db
    Api.post("phone/buy", { user_id: new_user.id }).catch((err) => {
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
          <CreateProfileOne createProfile={createProfile} />
          <Separator />
          <Heading title="Step 2 - Bot Configuration" description="" />
          <p className="text-foreground text-md">
            {" "}
            Customize how the bot handles various scenarios.{" "}
            <br className="hidden md:block" />
            1. Specify a transfer number for situations beyond the bot's
            capabilities. {"(Not Required)"}
            <br className="hidden md:block" />
            2. Toggle fallback mode to direct calls to voicemail when no live
            call representative is available, and set a fallback email to
            receive the voicemail transcriptions in such instances.{" "}
          </p>
          <Separator />
          <CreateBotConfig createConfig={createConfig} />
          <Separator />
          <p className="text-foreground text-md">
            Once you've completed the form, you can start using the bot.{" "}
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
