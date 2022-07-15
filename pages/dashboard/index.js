import React from "react";
import MainContent from "../../components/dashboard/MainContent";
import RightPreview from "../../components/dashboard/RightPreview";
import Sidebar from "../../components/dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="main-wrapper flex flex-row h-screen w-screen">
      <Sidebar />
      <MainContent />
      <RightPreview />
    </div>
  );
};

export default Dashboard;
