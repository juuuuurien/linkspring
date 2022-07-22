import { Button, Spinner } from "flowbite-react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LinkTab from "./components/LinkTab";
import MainNavbar from "./MainNavbar";

const MainContent = ({ userdata, children }) => {
  return (
    <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
      <MainNavbar />
      <div className="mx-auto w-full max-w-[640px]">{children}</div>
    </section>
  );
};

export default MainContent;
