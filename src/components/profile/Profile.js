import { ShareIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const ProfileLinkTab = ({ children, url, tabColor }) => {
  return (
    <a href={url} target="_new">
      <div
        style={{
          backgroundColor: tabColor,
        }}
        className={`normal-right-preview-tab xs:xs-right-preview-tab hover:scale-[1.05] transition-all ease-[cubic-bezier(.11,-0.85,.75,1.83)]`}
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
      style={{
        backgroundColor: theme.backgroundColor,
      }}
      className={`flex flex-col h-full justify-center items-center`}
    >
      <div className="flex content-[''] bg-gray-500 w-full h-[25%] mb-4 ">
        {profile?.banner && (
          <img
            src={profile?.banner}
            className="object-cover w-full h-full"
          ></img>
        )}
        {!profile?.banner && (
          <div className="flex content-[''] h-[140px] bg-gray-500 w-full mb-4 " />
        )}
      </div>
      <div className="w-full lg:max-w-[36%] h-full">
        <div className="flex flex-row w-full p-3">
          <ShareIcon
            onClick={() => {}}
            className="flex justify-center items-center h-8 w-8 self-end bg-slate-300 p-2 rounded-[100%] text-slate-800 hover:text-slate-400 cursor-pointer"
          />
        </div>
        <div
          className={`PORTFOLIO-WRAPPER flex flex-col items-center m-2 mb-10 ${theme?.profileTextColor}`}
        >
          <div className="flex bg-gray-600 w-[6rem] h-[6rem] mb-3 rounded-[100%] justify-center items-center">
            {profile.avatar && (
              <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
                <img
                  src={profile?.avatar}
                  className="w-full h-full rounded-[50%]"
                ></img>
              </div>
            )}
            {!profile.avatar && (
              <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
                <h1>JL</h1>
              </div>
            )}
          </div>
          <span className="font-bold text-lg">{"Julien's Profile"}</span>
          <span className="text-md">This is a sample bio</span>
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
      </div>{" "}
    </div>
  );
};

export default Profile;
