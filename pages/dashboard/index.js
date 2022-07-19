import React from "react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import MainContent from "../../components/dashboard/MainContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Head from "next/head";
import dbConnect from "../../util/mongoose";
import User from "../../models/User";

export default function Dashboard({ data }) {
  // data contains  username, links, profile of the user

  return (
    <>
      <Head>
        <title>Treeoflinks | Dashboard</title>
        <meta name="description" content="Treeoflinks dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent userdata={data} />
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

  if (session) {
    dbConnect();
    const user = await User.findOne({ email: session.user.email });

    const { username, links, profile } = user;

    return {
      props: {
        session: JSON.parse(JSON.stringify(session)),
        data: JSON.parse(JSON.stringify({ username, links, profile })),
      },
    };
  }

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
