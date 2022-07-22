import React from "react";
import RightPreview from "../dashboard/RightPreview";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = ({ children, userdata }) => {
  return (
    <div className="main-wrapper flex flex-row h-screen w-screen overflow-y-auto">
      <Sidebar userdata={userdata} />
      <div className="w-full">{children}</div>
      <RightPreview userdata={userdata} />
    </div>
  );
};

export default DashboardLayout;
