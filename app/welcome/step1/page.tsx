import { CreateProfileForm } from "@/components/forms/create-profile-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ProfileFormValues } from "@/lib/form-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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
        redirect("/welcome/step2");
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    });

    if (!dbUser) {
        const new_user = await db.user.create({
            data: {
                id: user.id,
                email: user.email,
            },
        });
    }



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
                    <CreateProfileForm createProfile={createProfile} setup={true} />
                    <Separator />
                </div>
            </div>
        </>
    );
}
