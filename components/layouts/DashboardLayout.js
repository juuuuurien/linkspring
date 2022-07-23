import React from "react";
import RightPreview from "../dashboard/RightPreview";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = ({ children, userdata, linkData, profileData }) => {
  return (
    <div className="main-wrapper flex flex-row h-screen w-screen overflow-y-auto">
      <Sidebar userdata={userdata} linkData={linkData} />
      <div className="w-full">{children}</div>
      <RightPreview
        userdata={userdata}
        linkData={linkData}
        profileData={profileData}
      />
    </div>
  );
};

export default DashboardLayout;
