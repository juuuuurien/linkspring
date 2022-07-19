import React from "react";
import RightPreview from "../dashboard/RightPreview";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="main-wrapper flex flex-row h-screen w-screen overflow-y-auto">
      <Sidebar />
      <div className="w-full">{children}</div>
      <RightPreview />
    </div>
  );
};

export default DashboardLayout;
