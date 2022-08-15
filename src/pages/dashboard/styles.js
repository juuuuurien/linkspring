import React, { useEffect, useState, Fragment } from "react";
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
import { ChromePicker } from "react-color";
import { usePopper } from "react-popper";
import { Popover, Transition, Dialog } from "@headlessui/react";

import { XIcon } from "@heroicons/react/solid";
import Head from "next/head";

const Appearance = ({ _session }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const themes = [
    {
      backgroundColor: "#111111",
      profileTextColor: "#eeeeee",
      tabColor: "#53d9a4",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor:
        "#000000 linear-gradient(45deg, #f7bb97, #dd5e89, #f7bb97, #dd5e89) repeat scroll 0% 0% / 400% 400%",
      profileTextColor: "#eeeeee",
      tabColor: "#ffffff",
      tabTextColor: "#111111",
    },
    {
      backgroundColor:
        "#000000 linear-gradient(45deg, #ee7752,#e73c7e, #23a6d5, #23d5ab) repeat scroll 0% 0% / 400% 400%",
      profileTextColor: "#eeeeee",
      tabColor: "#11111199",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor:
        "#000000 linear-gradient(45deg, #4ac2f4,#1e0f46, #132da8, #ec5696) repeat scroll 0% 0% / 400% 400%",
      profileTextColor: "#ec5696",
      tabColor: "#4ac2f422",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor: "#23a6d5",
      profileTextColor: "#eeeeee",
      tabColor: "#2a2a2a",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor: "#E11D48",
      profileTextColor: "#ffffff",
      tabColor: "#1E293B",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor: "#01a1ff",
      profileTextColor: "#ffdf5d",
      tabColor: "#ffffff",
      tabTextColor: "#2398db",
    },
    {
      backgroundColor: "#ECFCCB",
      profileTextColor: "#EA580C",
      tabColor: "#10B981",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor: "#ffeeee",
      profileTextColor: "#9D174D",
      tabColor: "#fc3360",
      tabTextColor: "#ffffff",
    },
    {
      backgroundColor: "#0F172A",
      profileTextColor: "#ffffff",
      tabColor: "#4B5563",
      tabTextColor: "#000000",
    },
    {
      backgroundColor: "#F1F5F9",
      profileTextColor: "#475569",
      tabColor: "#475569",
      tabTextColor: "#ffffff",
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

  const [bgColorPicker, setBgColorPicker] = useState(
    userdata?.backgroundColor || themeData?.backgroundColor
  );
  const [profileTextColorPicker, setProfileTextColorPicker] = useState(
    userdata?.profileTextColor || themeData?.profileTextColor
  );
  const [tabColorPicker, setTabColorPicker] = useState(
    userdata?.tabColor || themeData?.tabColor
  );
  const [tabTextColorPicker, setTabTextColorPicker] = useState(
    userdata?.tabTextColor || themeData.tabTextColor
  );

  useEffect(() => {
    setBgColorPicker(userdata?.backgroundColor || themeData?.backgroundColor);
    setProfileTextColorPicker(
      userdata?.profileTextColor || themeData?.profileTextColor
    );
    setTabColorPicker(userdata?.tabColor || themeData?.tabColor);
    setTabTextColorPicker(userdata?.tabTextColor || themeData.tabTextColor);
  }, [userdata, themeData]);

  const handleChangeBackroundColor = (updateObj) => {
    // obj is either { backgroundColor: color.hex} or { profileTextColor: color.hex}

    const newTheme = {
      ...themeData,
      ...updateObj,
    };

    handleUpdateTheme.mutate(newTheme);
  };
  const handleChangeTabColor = (updateObj) => {
    // obj is either { tabColor: color.hex} or { tabTextColor: color.hex}
    const newTheme = {
      ...themeData,
      ...updateObj,
    };

    handleUpdateTheme.mutate(newTheme);
  };

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
                        <div className=" flex flex-col bg-white p-5 gap-4 rounded-xl">
                          <h2 className="text-md font-semibold">
                            Background Color & Title Color
                          </h2>
                          <div className="flex gap-6">
                            <Popover className="relative">
                              <Popover.Button
                                style={{
                                  backgroundColor: themeData.backgroundColor,
                                }}
                                className={`h-10 w-10 rounded-lg border-2 border-black`}
                              />
                              <Popover.Panel className="absolute left-6 top-6 z-10">
                                <ChromePicker
                                  color={bgColorPicker}
                                  onChange={(color, event) =>
                                    setBgColorPicker(color.hex)
                                  }
                                  onChangeComplete={(color, event) => {
                                    const updateObj = {
                                      backgroundColor: color.hex,
                                    };
                                    handleChangeBackroundColor(updateObj);
                                    setBgColorPicker(color.hex);
                                  }}
                                />
                              </Popover.Panel>
                            </Popover>
                            <Popover className="relative">
                              <Popover.Button
                                style={{
                                  backgroundColor: themeData.profileTextColor,
                                }}
                                className={`h-10 w-10 rounded-lg border-2 border-black`}
                              />
                              <Popover.Panel className="absolute left-6 top-6 z-10">
                                <ChromePicker
                                  color={profileTextColorPicker}
                                  onChange={(color, event) =>
                                    setProfileTextColorPicker(color.hex)
                                  }
                                  onChangeComplete={(color, event) => {
                                    const updateObj = {
                                      profileTextColor: color.hex,
                                    };
                                    handleChangeBackroundColor(updateObj);
                                    setProfileTextColorPicker(color.hex);
                                  }}
                                />
                              </Popover.Panel>
                            </Popover>
                          </div>
                          <h2 className="text-md font-semibold">
                            Tab & Text Color
                          </h2>
                          <div className="flex gap-6">
                            <Popover className="relative">
                              <Popover.Button
                                style={{
                                  backgroundColor: themeData.tabColor,
                                }}
                                className={`h-10 w-10 rounded-lg border-2 border-black`}
                              />

                              <Popover.Panel className="absolute left-6 top-6 z-10">
                                <ChromePicker
                                  color={tabColorPicker}
                                  onChange={(color, event) =>
                                    setTabColorPicker(color.hex)
                                  }
                                  onChangeComplete={(color, event) => {
                                    const updateObj = {
                                      tabColor: color.hex,
                                    };
                                    handleChangeTabColor(updateObj);
                                    setTabColorPicker(color.hex);
                                  }}
                                />
                              </Popover.Panel>
                            </Popover>
                            <Popover className="relative">
                              <Popover.Button
                                style={{
                                  backgroundColor: themeData.tabTextColor,
                                }}
                                className={`h-10 w-10 rounded-lg border-2 border-black`}
                              />

                              <Popover.Panel className="absolute left-6 top-6 z-10">
                                <ChromePicker
                                  color={tabTextColorPicker}
                                  onChange={(color, event) =>
                                    setTabTextColorPicker(color.hex)
                                  }
                                  onChangeComplete={(color, event) => {
                                    const updateObj = {
                                      tabTextColor: color.hex,
                                    };
                                    handleChangeTabColor(updateObj);
                                    setTabTextColorPicker(color.hex);
                                  }}
                                />
                              </Popover.Panel>
                            </Popover>
                          </div>
                          <h2 className="text-md font-semibold">Templates</h2>
                          <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-4">
                            {themes.map((theme, index) => (
                              <button
                                onClick={() => handleUpdateTheme.mutate(theme)}
                                key={index}
                                style={{
                                  background: theme.backgroundColor,
                                }}
                                className={`flex gap-2 pb-6 justify-center min-h-[200px] flex-shrink-0 grow min-w-[80px] rounded-lg flex-col items-center focus:outline-none self-stretch ${theme.tabTextColor} border-[1px] border-gray-300 hover:scale-105 transition-all duration-200 ease-[cubic-bezier(1,-0.32,0,1.59)] animate-bg-gradient`}
                              >
                                <span
                                  style={{
                                    backgroundColor: theme.tabColor,
                                  }}
                                  className={`h-5 w-[80%] rounded-sm text-xs font-bold`}
                                />
                                <span
                                  style={{
                                    backgroundColor: theme.tabColor,
                                  }}
                                  className={`h-5 w-[80%] rounded-sm text-xs font-bold`}
                                />
                                <span
                                  style={{
                                    backgroundColor: theme.tabColor,
                                  }}
                                  className={`h-5 w-[80%] rounded-sm text-xs font-bold`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
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