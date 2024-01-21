import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [{ title: "Welcome", link: "/welcome" }];

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title="Welcome to ZaplineAI"
            description="Before you get started, please take a moment to read through the following information."
          />
        </div>
        <Separator />
      </div>
    </>
  );
}
