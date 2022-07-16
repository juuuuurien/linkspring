import React from "react";
import RightPreview from "../dashboard/RightPreview";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="main-wrapper flex flex-row h-screen w-screen">
      <Sidebar />
      <div className="w-full">{children}</div>
      <RightPreview />
    </div>
  );
};

export default DashboardLayout;
