import { Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import ProfileEditor from "../../components/dashboard/components/appearance/ProfileEditor";
import MainNavbar from "../../components/dashboard/MainNavbar";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Appearance = () => {
  return (
    <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
      <MainNavbar />
      <div className="mx-auto w-full max-w-[640px]">
        <div className="flex flex-col items-center py-10 gap-12">
          <div className="wrapper flex flex-col min-w-[50%] w-full h-auto p-3">
            <ProfileEditor />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appearance;

Appearance.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
