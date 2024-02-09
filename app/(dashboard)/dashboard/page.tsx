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
import { Api } from "@/lib/api";

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

  const call_stats = await Api.get("metrics/get", {
    user_id: user?.id,
  }).catch((err) => {
    return {
      total_metrics: {
        total_calls: "None",
        total_automated_calls: "None",
        total_transferred_calls: "None",
        total_abandoned_calls: "None",
        automated_call_rate: "None",
        transferred_call_rate: "None",
        abandoned_call_rate: "None",
      },
      weekly_metrics: {
        "2024-01-01": {
          total_calls: 5,
          automated_calls: 4,
          transferred_calls: 3,
        },
      },
      recent_metrics: [["No recent calls", "N/A"]],
    };
  });

  const weekly_total = () => {
    var sum = 0;
    for (const [date, metrics] of Object.entries(
      call_stats["weekly_metrics"],
    )) {
      const metrics_dict: any = metrics;
      sum += metrics_dict.total_calls;
    }
    return sum;
  };

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
                  <div className="text-2xl font-bold">
                    {call_stats["total_metrics"]["total_calls"]}
                  </div>
                  <p className="text-md text-muted-foreground">
                    Total calls received
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
                  <div className="text-2xl font-bold">
                    {call_stats["total_metrics"]["total_automated_calls"]}
                  </div>
                  <p className="text-md text-muted-foreground">
                    {call_stats["total_metrics"]["automated_call_rate"]} of
                    total calls
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
                  <div className="text-2xl font-bold">
                    {call_stats["total_metrics"]["total_transferred_calls"]}
                  </div>
                  <p className="text-md text-muted-foreground">
                    {call_stats["total_metrics"]["transferred_call_rate"]} of
                    total calls
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
                  <div className="text-2xl font-bold">
                    {call_stats["total_metrics"]["total_abandoned_calls"]}
                  </div>
                  <p className="text-md text-muted-foreground">
                    {call_stats["total_metrics"]["abandoned_call_rate"]} of
                    total calls
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
                  <Overview weeklyMetrics={call_stats["weekly_metrics"]} />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Calls</CardTitle>
                  <CardDescription>
                    You received {weekly_total()} calls this week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentCalls calls={call_stats["recent_metrics"]}/>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
