import BreadCrumb from "@/components/breadcrumb";
import CallRecordings from "@/components/call-archive";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { Api } from "@/lib/api";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const breadcrumbItems = [{ title: "Call Archive", link: "/dashboard/archive" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const recordings = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  date: generateRandomDate(new Date(2024, 0, 1), new Date()),
}));

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
    (country ? `&search=${country}` : ""),
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = employeeRes.users;

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
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Call Archive (${call_stats.total_metrics.total_calls})`}
            description="View all calls made by your bot."
          />
        </div>
        <Separator />
        <CallRecordings recordings={recordings} />
      </div>
    </>
  );
}
