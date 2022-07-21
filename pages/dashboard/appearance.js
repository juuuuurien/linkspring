import { Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import MainNavbar from "../../components/dashboard/MainNavbar";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Appearance = () => {
  return (
    <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
      <MainNavbar />
      <div className="mx-auto w-full max-w-[640px]">
        <div className="flex flex-col items-center py-10 gap-12">
          <div className="wrapper flex flex-col min-w-[50%] bg-pink-200 w-full h-auto  border border-gray-200 z-10 p-3">
            <div className="PROFILE EDIT COMPONENT HERE">
              <h2>Profile</h2>
              <div className="flex flex-col p-5 gap-5 bg-white rounded-xl">
                <div className="flex flex-row gap-5">
                  <div className="flexw-fit h-auto">
                    <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
                      <h1>JL</h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full h-full">
                    <div className="flex flex-row w-auto h-fit rounded-lg p-2 bg-purple-500 justify-center items-center text-slate-100">
                      <h3>Pick an Image</h3>
                    </div>
                    <div className="flex flex-row w-auto h-fit rounded-lg p-2 bg-slate-200 justify-center items-center  text-slate-600">
                      <h3>Remove</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="profile-title" value="Profile Title" />
                  <TextInput id="profile-title" />
                  <Label htmlFor="profile-title" value="Profile Title" />
                  <Textarea id="profile-title" />
                </div>
              </div>
            </div>
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
