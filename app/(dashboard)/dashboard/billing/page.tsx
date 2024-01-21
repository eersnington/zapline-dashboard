import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [{ title: "Billing", link: "/dashboard/billing" }];

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title="Billing Information"
            description="Manage your billing and plan information."
          />
        </div>
        <Separator />
      </div>
    </>
  );
}
