import Link from "next/link";
import React from "react";

import { UserIcon } from "@heroicons/react/solid";
import { ShareIcon } from "@heroicons/react/outline";
import Profile from "../profile/Profile";

const PVLinkTab = ({ children, url, tabColor }) => {
  return (
    <a href={url} target="_new">
      <div
        style={{
          backgroundColor: tabColor,
        }}
        className={`flex rounded-xl justify-center items-center text-center text-white text-xs font-semibold w-full py-3.5 px-6 hover:scale-[1.05] transition-transform  hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]`}
      >
        {children}
      </div>
    </a>
  );
};

// In preview, we're getting data from the main data section of the dashboard
// liveData will contain data from the query made on the main dashboard

//  i.e liveData from index.js --> contains {links: []} that will change on udpates
//      liveData from appearance.js --> {profile: {}, theme: {}}

// want to bind liveData to UI, or initial data

const RightPreview = ({ initialData, liveData }) => {
  if (!initialData)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="PHONE-WRAPPER flex flex-col h-[34rem] w-[17rem] items-center p-2 border-[.9rem] bg-gray-200 animate-pulse border-slate-900 rounded-[2.5rem]"></div>
      </div>
    );

  const { username, profile, links, theme } = initialData;

  const linkData = liveData.links || initialData.links;
  const profileData = liveData.profile || initialData.profile;
  const themeData = liveData.theme || initialData.theme;

  const getHeaderLayout = () => {
    if (themeData.headerLayout === "left") return "justify-start";
    if (themeData.headerLayout === "center") return "justify-center";

    return "justify-end";
  };

  const getBioLayout = () => {
    if (themeData.headerLayout === "left") return "text-start";
    if (themeData.headerLayout === "center") return "text-center";

    return "text-end";
  };

  return (
    initialData && (
      <>
        <div className="hidden md:flex flex-row gap-2 w-full p-3">
          <h3 className="text-sm">My Linkspring:</h3>
          <span className="text-sm visited:text-blue-600">
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/${username}`}
            >{`${process.env.NEXT_PUBLIC_URL}/${username}`}</Link>
          </span>
        </div>
        <div className="flex justify-center items-center h-full w-full">
          <div
            style={{
              background: themeData?.backgroundColor,
            }}
            className={`PHONE-WRAPPER flex flex-col scale-[0.85] xl:scale-100 h-[685px] max-w-[340px] w-[340px] items-center border-[.9rem] border-black rounded-[2.5rem] transition-all ease animate-bg-gradient overflow-hidden`}
          >
            {/* <div className="flex flex-row w-full">
            <ShareIcon
              onClick={() => {}}
              className="flex justify-center items-center h-8 w-8 self-end bg-slate-300 p-2 rounded-[100%] text-slate-800 hover:text-slate-400 cursor-pointer"
            />
          </div> */}
            <div className="flex content-[''] bg-gray-500 w-full h-[22%] mb-4 rounded-t-3xl">
              <button className="absolute top-2 right-2 flex self-end h-fit w-fit justify-center items-center p-2 rounded-[100%] hover:bg-[#ffffff22] transition-all">
                <ShareIcon
                  style={{ color: themeData?.profileTextColor }}
                  className="w-4 h-4"
                />
              </button>
              {profileData.banner && (
                <img
                  src={profileData.banner}
                  className="object-cover w-full h-full"
                ></img>
              )}
              {!profileData.banner && (
                <div className="flex content-[''] h-[140px] bg-gray-500 w-full mb-4 rounded-t-3xl" />
              )}
            </div>
            <div
              style={{ color: themeData?.profileTextColor }}
              className={`PORTFOLIO-WRAPPER flex flex-col items-start w-full mb-10`}
            >
              <div
                className={`flex ${getHeaderLayout()} w-full mt-[-104px] px-2 `}
              >
                {profileData?.avatar && (
                  <div className="left-2 rounded-[50%] bg-gray-500 text-slate-100 w-[102px] h-[102px] m-2 shadow-md">
                    <img
                      src={profileData.avatar}
                      className="w-full h-full rounded-[50%]"
                    ></img>
                  </div>
                )}
                {!profileData?.avatar && (
                  <div className="flex justify-center items-center left-2 rounded-[50%] bg-gray-400 text-slate-100 w-[96px] h-[96px] m-2 shadow-md">
                    <UserIcon className="w-10 h-10 text-gray-100" />
                  </div>
                )}
              </div>
              <div
                className={`relative flex ${getBioLayout()} flex-col w-full px-3 gap-1`}
              >
                <span className="font-bold text-xl">{profileData?.title}</span>
                <span className="text-sm font-semibold">
                  {profileData?.bio}
                </span>
              </div>
            </div>
            <div className="LINKS-WRAPPER flex flex-col w-full gap-3 max-h-[55%] overflow-y-scroll no-scrollbar px-4">
              {linkData?.map((e) => {
                if (!e.url || !e.title) return;
                return (
                  <PVLinkTab
                    tabColor={themeData?.tabColor}
                    url={e.url}
                    key={e.title.concat(e.url)}
                  >
                    <span style={{ color: themeData.tabTextColor }}>
                      {e.title}
                    </span>
                  </PVLinkTab>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default RightPreview;
