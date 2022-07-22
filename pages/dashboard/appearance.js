import { Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import ProfileEditor from "../../components/dashboard/components/appearance/ProfileEditor";
import MainNavbar from "../../components/dashboard/MainNavbar";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import dbConnect from "../../util/mongoose";
import User from "../../models/User";

const Appearance = ({ userdata }) => {
  return (
    <DashboardLayout userdata={userdata} linkData={userdata.links}>
      <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
        <MainNavbar />
        <div className="mx-auto w-full max-w-[640px]">
          <div className="flex flex-col items-center py-10 gap-12">
            <div className="wrapper flex flex-col min-w-[50%] w-full h-auto p-3">
              <ProfileEditor />
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
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
        userdata: JSON.parse(JSON.stringify({ username, links, profile }))
      }
    };
  }

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
}

export default Appearance;
