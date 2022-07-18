import React from "react";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import MainContent from "../../components/dashboard/MainContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function Dashboard() {
  const session = useSession();
  console.log(session, "index.js/dashboard");

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
        <p>{session.data?.user.name}</p>
        <p>{session.data?.user.email}</p>
      </>
    );
  }

  return <MainContent />;
}

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session))
    }
  };
}
