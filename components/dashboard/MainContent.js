import { Button } from "flowbite-react";
import React from "react";
import MainNavbar from "./MainNavbar";

const MainContent = () => {
  return (
    <section className="flex flex-col items-center w-full h-full bg-gray-100">
      <MainNavbar />
      <div className="mx-auto w-full max-w-[640px]">
        <div className="flex flex-col items-center py-10 gap-12">
          <Button pill>
            <div className="text-lg font-bold w-">Add New Link</div>
          </Button>
          <div className="min-h-[8rem] w-full bg-white rounded-[33px] p-6">
            Example Card
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
