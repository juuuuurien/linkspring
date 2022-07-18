import React from "react";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import MainContent from "../../components/dashboard/MainContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Head from "next/head";

export default function Dashboard() {
  const session = useSession();
  const { user } = session.data;

  console.log(user);

  return (
    <>
      <Head>
        <title>Treeoflinks | Dashboard</title>
        <meta name="description" content="Treeoflinks dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent data={session.data} />
    </>
  );
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
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
