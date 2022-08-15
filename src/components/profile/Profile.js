import { DotsVerticalIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";

const ProfileLinkTab = ({ children, url, tabColor }) => {
  return (
    <a href={url} target="_new">
      <div
        style={{
          backgroundColor: tabColor,
        }}
        className={`normal-right-preview-tab xs:xs-right-preview-tab hover:scale-[1.05] transition-all ease-[cubic-bezier(.11,-0.85,.75,1.83)] `}
      >
        {children}
      </div>
    </a>
  );
};

const Profile = ({ userdata }) => {
  const { links, username, profile, theme } = userdata;
  // console.log(links, username, profile, theme);

  return (
    <div
      className={`flex flex-col w-screen h-screen justify-center items-center`}
    >
      <div
        style={{
          background: theme.backgroundColor,
        }}
        className={`flex flex-col w-full xl:max-w-[66%] xl:rounded-[20px] xl:overflow-auto h-full justify-center items-center z-10`}
      >
        <div className="relative flex bg-gray-500 w-full h-[23%] ">
          <button className="absolute flex justify-center items-center top-2 right-2 w-8 h-8 bg-black p-1 rounded-[100%] opacity-60 hover:opacity-50 hover:bg-slate-600 transition-all z-[100]">
            <DotsVerticalIcon className="text-slate-200" />
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
            className={`PORTFOLIO-WRAPPER flex flex-col mt-[-98px] lg:mt-[-100px] m-2 mb-10`}
          >
            <div
              className="rounded-[50%] h-fit w-fit mb-5  hover:scale-[1.1] transition-all ease-[cubic-bezier(.11,-0.85,.75,1.83)] cursor-pointer"
              style={{
                border: `4px solid ${theme.backgroundColor}`,
                zIndex: 2,
              }}
            >
              {profile.avatar && (
                <div className="rounded-[50%] bg-gray-500 text-slate-100 w-[104px] h-[104px] lg:w-[148px] lg:h-[148px]">
                  <Image
                    src={profile?.avatar}
                    className="w-full h-full rounded-[50%]"
                    width={148}
                    height={148}
                  ></Image>
                </div>
              )}
              {!profile.avatar && (
                <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[148px] h-[148px]">
                  <h1>JL</h1>
                </div>
              )}
            </div>
            <div
              style={{ color: theme?.profileTextColor }}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-row items-center justify-between">
                <span className="whitespace-nowrap font-bold text-2xl lg:text-3xl">
                  {profile.title}
                </span>
                <div className="flex justify-end w-full rounded-md gap-4 lg:gap-10 px-2">
                  <div className="lg:w-10 lg:h-10 h-6 w-6 rounded-md bg-slate-200" />
                  <div className="lg:w-10 lg:h-10 h-6 w-6 rounded-md bg-slate-200" />
                  <div className="lg:w-10 lg:h-10 h-6 w-6 rounded-md bg-slate-200" />
                </div>
              </div>
              <span className="text-md lg:text-lg">{profile.bio}</span>
            </div>
          </div>
          <div className="LINKS-WRAPPER flex flex-col w-full px-2.5 gap-2">
            {links?.map((e) => {
              if (!e.url || !e.title) return;
              return (
                <ProfileLinkTab
                  url={e.url}
                  key={e.title.concat(e.url)}
                  tabColor={theme.tabColor}
                >
                  <span style={{ color: theme.tabTextColor }}>{e.title}</span>
                </ProfileLinkTab>
              );
            })}
          </div>
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
  );
};

export default Profile;
