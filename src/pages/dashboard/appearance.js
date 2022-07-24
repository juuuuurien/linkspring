import React from "react";
import ProfileEditor from "../../components/dashboard/components/appearance/ProfileEditor";
import MainNavbar from "../../components/dashboard/MainNavbar";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import dbConnect from "../../util/mongoose";
import User from "../../models/User";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getProfile, updateProfile } from "../../services/profileServices";

const Appearance = ({ userdata }) => {
  const queryClient = useQueryClient();

  const { data: queryData, isLoading } = useQuery(
    ["profile"],
    async () => getProfile(userdata.username),
    {
      initialData: userdata.profile,
    }
  );

  const handleUpdateProfile = useMutation(
    (updatedProfile) =>
      updateProfile({
        updatedProfile,
        username: userdata.username,
      }),
    {
      onMutate: async (updatedProfile) => {
        await queryClient.cancelQueries(["profile"]);
        const previousValue = queryClient.getQueryData(["profile"]);

        const { title, bio } = updatedProfile;

        queryClient.setQueryData(["profile"], (old) => {
          return {
            ...old,
            title,
            bio,
          };
        });

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData(["profile"], previousValue);
        console.log(err);
      },
      // After success or failure, refetch the profile query
      onSettled: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );

  console.log(queryData, "THIS IS PROFILE QUERY");

  return (
    <DashboardLayout
      userdata={userdata}
      linkData={userdata.links}
      profileData={queryData}
    >
      <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
        <MainNavbar />
        <div className="mx-auto w-full max-w-[640px]">
          <div className="flex flex-col items-center py-10 gap-12">
            <div className="wrapper flex flex-col min-w-[50%] w-full h-auto p-3">
              <div className="profile-wrapper">
                <h2 className="text-xl font-semibold mb-6">Profile</h2>
                <ProfileEditor
                  initialData={userdata}
                  liveData={queryData}
                  handleUpdateProfile={handleUpdateProfile}
                />
              </div>
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
        userdata: JSON.parse(JSON.stringify({ username, links, profile })),
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

export default Appearance;
