import React, { useEffect, useState, Fragment } from "react";
import ProfileEditor from "../../components/dashboard/styles/ProfileEditor";

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
import { ChromePicker } from "react-color";
import { usePopper } from "react-popper";
import { Popover, Transition, Dialog } from "@headlessui/react";

import { XIcon } from "@heroicons/react/solid";
import Head from "next/head";

import { THEMES } from "../../components/dashboard/styles/ThemesSection/util";
import ThemesSection from "../../components/dashboard/styles/ThemesSection/ThemesSection";

const Appearance = ({ _session }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

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

  const { data: profileData, isLoading: isProfileLoading } = useQuery(
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

        const { title, bio, avatar, banner } = updatedProfile;

        queryClient.setQueryData(["profile"], (old) => {
          return {
            ...old,
            title,
            bio,
            avatar,
            banner,
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

        console.log(profileTextColor, "profileTextColor");

        const { backgroundColor, profileTextColor, tabColor, tabTextColor } =
          updatedTheme;

        queryClient.setQueryData(["theme"], (old) => {
          return {
            ...old,
            backgroundColor,
            profileTextColor,
            tabColor,
            tabTextColor,
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

  if (isUserLoading) {
    return <DashboardSkeleton />;
  }

  return (
    userdata && (
      <>
        <Head>
          <title>Linkspring - Styling</title>
          <meta name="description" content="Linkspring dashboard" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="main-wrapper flex flex-col md:flex-row h-screen w-screen overflow-y-auto">
          <Sidebar initialData={userdata} />
          <section className="flex flex-col items-center w-full h-full bg-gray-100 overflow-y-auto">
            <MainNavbar />
            <div className="MAINCONTENT WRAPPER mx-auto w-full h-full max-w-[640px]">
              <section className="flex flex-col items-center h-full bg-gray-100">
                <div className="mx-auto w-full max-w-[640px]">
                  <div className="flex flex-col items-center py-10 gap-12">
                    <div className="wrapper flex flex-col min-w-[50%] w-full h-auto p-3 gap-10">
                      <div className="profile-wrapper">
                        <h2 className="text-xl font-semibold mb-6">Profile</h2>
                        <ProfileEditor
                          isProfileLoading={isProfileLoading}
                          initialData={userdata}
                          liveData={profileData}
                          handleUpdateProfile={handleUpdateProfile}
                        />
                      </div>
                      <div className="theme-wrapper">
                        <h2 className="text-xl font-semibold mb-6">Theme</h2>
                        <ThemesSection
                          userdata={userdata}
                          themeData={themeData}
                          handleUpdateTheme={handleUpdateTheme}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <div className="hidden md:flex flex-col items-center max-w-[33%] w-full h-auto bg-gray-100 border border-gray-200 z-10 ">
            <RightPreviewSection
              initialData={userdata}
              liveData={{ profile: profileData, theme: themeData }}
            />
          </div>
          <Transition appear show={previewOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setPreviewOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="flex flex-col justify-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                      <button
                        onClick={() => setPreviewOpen(false)}
                        className="self-end w-10 h-10 bg-gray-200 text-slate-600 p-2 hover:scale-[1.1] text-lg font-medium leading-6 rounded-[100%]"
                      >
                        <XIcon />
                      </button>
                      <div>
                        <RightPreviewSection
                          initialData={userdata}
                          liveData={{ profile: profileData, theme: themeData }}
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <button
            onClick={() => setPreviewOpen(true)}
            className="md:hidden fixed self-center bottom-10 rounded-[10000px] text-slate-900 font-bold text-xl z-10 bg-indigo-300 px-4 py-2"
          >
            Preview
          </button>
        </div>
      </>
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
