import React from "react";
import { unstable_getServerSession, useSession } from "next-auth/react";
import MainContent from "../../components/dashboard/MainContent";
import RightPreview from "../../components/dashboard/RightPreview";
import Sidebar from "../../components/dashboard/Sidebar";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }

  return <MainContent />;
}

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
