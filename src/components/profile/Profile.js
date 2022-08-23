import { ShareIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import ProfileTabGrid from "./ProfileTabGrid";
import ProfileTabList from "./ProfileTabList";

const Profile = ({ userdata }) => {
  const { links, username, profile, theme } = userdata;
  // console.log(links, username, profile, theme);

  const getHeaderLayout = () => {
    if (theme.headerLayout === "left") return "justify-start";
    if (theme.headerLayout === "center") return "justify-center";

    return "justify-end";
  };

  const getBioLayout = () => {
    if (theme.headerLayout === "left") return "text-start";
    if (theme.headerLayout === "center") return "text-center";

    return "text-end";
  };

  return (
    <>
      <Head>
        <title>
          {profile?.title !== "Example bio"
            ? profile?.title
            : `${username}'s Linkspring`}
        </title>
        <meta name="description" content={`${username}'s Linkspring profile`} />
      </Head>
      <div
        className={`flex flex-col w-screen h-screen justify-center items-center min-w-[360px] min-h-[650px]`}
      >
        <div
          style={{
            background: theme.backgroundColor,
          }}
          className={`flex flex-col w-full xl:max-w-[66%] xl:rounded-[20px] xl:overflow-auto h-full justify-center items-center z-10`}
        >
          <div className="relative flex bg-gray-500 w-full h-[23%] ">
            <button
              onClick={async () =>
                await navigator.share({
                  title: `${username}'s Linkspring`,
                  text: `Checkout all my links on Linkspring!`,
                  url: `https://linkspring.me/${username}`,
                })
              }
              className="absolute flex justify-center items-center top-2 right-2 w-8 h-8 bg-black p-1 rounded-[100%] opacity-60 hover:opacity-50 hover:bg-slate-600 transition-all z-[100]"
            >
              <ShareIcon className="text-slate-200" />
            </button>
            {profile?.banner && (
              <Image
                src={profile?.banner}
                layout="fill"
                className="object-cover w-full h-full"
              />
            )}
            {!profile?.banner && (
              <div className="flex content-[''] h-[23%] bg-gray-500 w-full mb-4 " />
            )}
          </div>
          <div className=" w-full md:max-w-[65%] px-3 h-full">
            <div
              className={`PORTFOLIO-WRAPPER flex flex-col mt-[-50px] lg:mt-[-100px] m-2 mb-10`}
            >
              <div className={`flex ${getHeaderLayout()} w-full px-2`}>
                {profile.avatar && (
                  <div className="rounded-[50%] ${getHeaderLayout()} bg-gray-500 text-slate-100 w-[104px] h-[104px] lg:w-[148px] lg:h-[148px]">
                    <Image
                      src={profile?.avatar}
                      className="w-full h-full rounded-[50%]"
                      width={148}
                      height={148}
                    ></Image>
                  </div>
                )}
                {!profile.avatar && (
                  <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[148px] h-[148px] z-10">
                    <h1>JL</h1>
                  </div>
                )}
              </div>
              <div
                style={{ color: theme?.profileTextColor }}
                className={`relative flex ${getBioLayout()} flex-col w-full px-3 gap-1`}
              >
                <span className="whitespace-nowrap font-bold text-2xl lg:text-3xl">
                  {profile.title}
                </span>
                <span className="text-md lg:text-lg">{profile.bio}</span>
              </div>
            </div>
            {theme.tabLayout === "grid" ? (
              <ProfileTabGrid linkData={links} themeData={theme} />
            ) : (
              <ProfileTabList linkData={links} themeData={theme} />
            )}
          </div>
        </div>
        <div
          style={{ backgroundColor: theme.backgroundColor }}
          className="absolute h-screen w-screen z-0 brightness-[0.65] "
        >
          {profile?.banner && (
            <Image
              src={profile.banner}
              layout="fill"
              className="blur scale-[1.1]"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
