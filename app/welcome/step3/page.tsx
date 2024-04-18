import { CreateBotConfigForm } from "@/components/forms/create-config-form";
import { CreateProfileForm } from "@/components/forms/create-profile-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ConfigFormValues, IntegrationFormValues, ProfileFormValues } from "@/lib/form-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Api } from "@/lib/api";
import { UpdateIntegrationForm } from "@/components/forms/integrations-form";
import Link from "next/link";

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
    }

    async function updateBot(data: IntegrationFormValues) {
        "use server";
        // create bot in db
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
            }
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
                        setup={true}
                    />
                    <Separator />
                    <p className="text-foreground text-md">
                        Note: You will not receive a bot number without connecting your Shopify Store
                    </p>
                    <Link
                        className={buttonVariants({
                            variant: "default",
                        })}
                        href="/dashboard/"
                    >
                        Continue without Shopify
                    </Link>
                </div>
            </div>
        </>
    );
}
