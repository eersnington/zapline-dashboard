import { CreateBotConfigForm } from "@/components/forms/create-config-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ConfigFormValues } from "@/lib/form-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user?.id || !user?.email) {
        redirect("/");
    }

    const userConfig = await db.config.findFirst({
        where: {
            userId: user?.id,
        },
    });

    if (userConfig) {
        redirect("/welcome/step3");
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
                    redirect("/welcome/step3");
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
                    <CreateBotConfigForm createConfig={createConfig} setup={true} />
                    <Separator />
                </div>
            </div>
        </>
    );
}
