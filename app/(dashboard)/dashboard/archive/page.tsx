import BreadCrumb from "@/components/breadcrumb";
import CallRecordings from "@/components/call-archive";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";

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
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Call Archive (342)`}
            description="View all calls made by your bot."
          />
        </div>
        <Separator />
        <CallRecordings recordings={recordings} />
      </div>
    </>
  );
}
