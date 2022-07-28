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
  const themes = [
    {
      backgroundColor: "bg-rose-600",
      tabColor: "bg-slate-800",
      textColor: `text-white`,
    },
    {
      backgroundColor: "bg-indigo-600",
      tabColor: "bg-slate-600",
      textColor: "text-white",
    },
    {
      backgroundColor: "bg-lime-100",
      tabColor: "bg-emerald-300",
      textColor: "text-orange-400",
    },
    {
      backgroundColor: "bg-violet-700",
      tabColor: "bg-rose-800",
      textColor: "text-pink-300",
    },
    {
      backgroundColor: "bg-slate-900",
      tabColor: "bg-gray-500",
      textColor: "text-black",
    },
    {
      backgroundColor: "bg-slate-1--",
      tabColor: "bg-slate-600",
      textColor: "text-white",
    },
  ];

  const queryClient = useQueryClient();

  const { data: userdata, isLoading: isUserLoading } = useQuery(
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

  const updateProfile = async (updatedProfile) => {
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

  const { data: profileData, isProfileLoading } = useQuery(
    ["profile"],
    getProfile,
    {
      initialData: userdata?.profile || {},
    }
  );

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

  const getTheme = async () => {
    return await (
      await fetch(`/api/theme`, {
        method: "POST",
        body: JSON.stringify({
          type: "get",
        }),
      })
    ).json();
  };

  const updateTheme = async (updatedTheme) => {
    return await (
      await fetch(`/api/theme`, {
        method: "POST",
        body: JSON.stringify({
          type: "update",
          ...updatedTheme,
        }),
      })
    ).json();
  };

  const { data: themeData, isThemeLoading } = useQuery(["theme"], getTheme, {
    initialData: userdata?.theme || {},
  });

  const handleUpdateTheme = useMutation(
    (updatedTheme) =>
      // pass to new theme to api endpoint
      updateTheme(updatedTheme),
    {
      onMutate: async (updatedTheme) => {
        await queryClient.cancelQueries(["theme"]);
        const previousValue = queryClient.getQueryData(["theme"]);

        const { backgroundColor, tabColor, textColor } = updatedTheme;

        queryClient.setQueryData(["theme"], (old) => {
          return {
            ...old,
            backgroundColor,
            tabColor,
            textColor,
          };
        });

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData(["theme"], previousValue);
      },
      // After success or failure, refetch the theme query
      onSettled: () => {
        queryClient.invalidateQueries(["theme"]);
      },
    }
  );

  // mutate happens when you click on the theme button

  // console.log(queryData, "THIS IS PROFILE QUERY");

  if (isUserLoading) {
    return <DashboardSkeleton />;
  }

  console.log(themeData, "checking themeData");

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
                        <div className="inline-grid w-full  grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] p-5 gap-4 bg-white rounded-xl">
                          {themes.map((theme, index) => (
                            <button
                              onClick={() => handleUpdateTheme.mutate(theme)}
                              key={index}
                              className={`flex gap-2 pb-6 justify-center min-h-[200px] flex-shrink-0 grow min-w-[80px] rounded-lg flex-col items-center focus:outline-none self-stretch ${theme.backgroundColor} ${theme.textColor} border-[1px] border-gray-300 hover:scale-105 transition-all duration-200 ease-[cubic-bezier(1,-0.32,0,1.59)]`}
                            >
                              <span
                                className={`h-4 w-[80%] rounded-lg ${theme.tabColor} text-xs font-bold`}
                              />
                              <span
                                className={`h-4 w-[80%] rounded-lg ${theme.tabColor} text-xs font-bold`}
                              />
                              <span
                                className={`h-4 w-[80%] rounded-lg ${theme.tabColor} text-xs font-bold`}
                              />
                            </button>
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
          liveData={{ profile: profileData, theme: themeData }}
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
