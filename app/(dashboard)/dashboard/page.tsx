import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentCalls } from "@/components/recent-calls";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Icons } from "@/components/icons";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser } = getKindeServerSession();

  const kinde_user = await getUser();

  const user = await db.user.findFirst({
    where: {
      id: kinde_user?.id,
    },
  });

  if (user === null) {
    redirect("/welcome");
  }

  const bot_phone_number = await db.bot.findFirst({
    where: {
      userId: user?.id,
    },
  });

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, welcome back 👋
          </h2>
          <div className="hidden md:flex items-center space-x-2">
            <Badge className="text-sm bg-orange-500 text-white">
              Bot Phone Number: {bot_phone_number?.phone_no}
            </Badge>

            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Total Calls
                  </CardTitle>
                  <Icons.phoneIncoming className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">702</div>
                  <p className="text-md text-muted-foreground">
                    Total calls received this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Automated Calls
                  </CardTitle>
                  <Icons.bot className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">394</div>
                  <p className="text-md text-muted-foreground">
                    56.13% of total calls
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Calls Transfered
                  </CardTitle>
                  <Icons.phoneForward className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">282</div>
                  <p className="text-md text-muted-foreground">
                    40.17% of total calls
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    Calls Abandoned
                  </CardTitle>
                  <Icons.dollar className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">26</div>
                  <p className="text-md text-muted-foreground">
                    3.70% of total calls
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview - Calls Weekly</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Calls</CardTitle>
                  <CardDescription>
                    You received 702 calls this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentCalls />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
