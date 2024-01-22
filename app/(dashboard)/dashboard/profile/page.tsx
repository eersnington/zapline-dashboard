import BreadCrumb from "@/components/breadcrumb";
import { CreateProfileOne } from "@/components/forms/create-profile";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne categories={[]} initialData={null} />
      </div>
    </>
  );
}
