// import React from "react";
import ProfileEditor from "../../components/dashboard/appearance/ProfileEditor";

// import DashboardLayout from "../../components/layouts/DashboardLayout";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

// import MainContentSection from "../../components/dashboard/MainContentSection";
import RightPreviewSection from "../../components/dashboard/RightPreviewSection";
import Sidebar from "../../components/dashboard/Sidebar";
import MainNavbar from "../../components/dashboard/MainNavbar";

import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

// import User from "../../models/User";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Appearance = ({ _session }) => {
  const queryClient = useQueryClient();

  const { data: userdata, isLoading: userLoading } = useQuery(
    ["userdata"],
    async () => {
      return await (
        await fetch(`/api/user`, {
          method: "POST",
          body: JSON.stringify({ email: _session.user.email }),
        })
      ).json();
    }
  );

  // profile api calls
  const getProfile = async () => {
    return await (
      await fetch(`/api/profile`, {
        method: "POST",
        body: JSON.stringify({
          type: "get",
        }),
      })
    ).json();
  };

  const updateProfile = async (updatedProfile, username) => {
    // updatedProfile contains
    return await (
      await fetch(`/api/profile`, {
        method: "POST",
        body: JSON.stringify({
          type: "update",
          ...updatedProfile,
        }),
      })
    ).json();
  };

  const { data: profileData, isLoading } = useQuery(["profile"], getProfile, {
    initialData: userdata?.profile || {},
  });

  const handleUpdateProfile = useMutation(
    (updatedProfile) =>
      updateProfile({
        updatedProfile,
      }),
    {
      onMutate: async (updatedProfile) => {
        await queryClient.cancelQueries(["profile"]);
        const previousValue = queryClient.getQueryData(["profile"]);

        const { title, bio, avatar } = updatedProfile;

        queryClient.setQueryData(["profile"], (old) => {
          return {
            ...old,
            title,
            bio,
            avatar,
          };
        });

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData(["profile"], previousValue);
      },
      // After success or failure, refetch the profile query
      onSettled: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );

  // console.log(queryData, "THIS IS PROFILE QUERY");

  if (userLoading) {
    return <DashboardSkeleton />;
  }

  const themes = [{}];

  return (
    userdata && (
      <div className="main-wrapper flex flex-row h-screen w-screen overflow-y-auto">
        <Sidebar />
        <div className="w-full">
          <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
            <MainNavbar />
            <div className="MAINCONTENT WRAPPER mx-auto w-full h-full max-w-[640px]">
              <section className="flex flex-col items-center h-full bg-gray-100">
                <div className="mx-auto w-full max-w-[640px]">
                  <div className="flex flex-col items-center py-10 gap-12">
                    <div className="wrapper flex flex-col min-w-[50%] w-full h-auto p-3 gap-10">
                      <div className="profile-wrapper">
                        <h2 className="text-xl font-semibold mb-6">Profile</h2>
                        <ProfileEditor
                          initialData={userdata}
                          liveData={profileData}
                          handleUpdateProfile={handleUpdateProfile}
                        />
                      </div>
                      <div className="theme-wrapper">
                        <h2 className="text-xl font-semibold mb-6">Theme</h2>
                        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] p-5 gap-4 bg-white rounded-xl">
                          {"splitmeintoabunchofletters"
                            .split("")
                            .map((letter, index) => (
                              <div
                                key={index}
                                className="group flex py-[6rem] bg-gray-200 rounded-xl px-5 flex-col items-center focus:outline-none self-stretch"
                              >
                                {letter}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
        <RightPreviewSection
          initialData={userdata}
          liveData={{ profile: profileData }}
        />
      </div>
    )
  );
};

export default Appearance;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {
      _session: JSON.parse(JSON.stringify(session)),
    },
  };
}
