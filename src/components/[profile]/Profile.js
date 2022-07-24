import { ShareIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const ProfileLinkTab = ({ children, url }) => {
  return (
    <a href={url} target="_new">
      <div className="normal-right-preview-tab xs:xs-right-preview-tab hover:scale-[1.05] transition-all ease-[cubic-bezier(.11,-0.85,.75,1.83)]">
        {children}
      </div>
    </a>
  );
};

const Profile = ({ userdata }) => {
  const { links, username, profile } = userdata;
  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gray-100">
      <div className="w-full lg:max-w-[36%] h-full">
        <div className="flex flex-row w-full p-3">
          <ShareIcon
            onClick={() => {}}
            className="flex justify-center items-center h-8 w-8 self-end bg-slate-300 p-2 rounded-[100%] text-slate-800 hover:text-slate-400 cursor-pointer"
          />
        </div>
        <div className="PORTFOLIO-WRAPPER flex flex-col items-center m-2 mb-10">
          <div className="flex bg-gray-600 w-[6rem] h-[6rem] mb-3 rounded-[100%] justify-center items-center">
            <h1>JL</h1>
          </div>
          <span className="font-bold text-lg">{"Julien's Profile"}</span>
          <span className="text-md">This is a sample bio</span>
        </div>
        <div className="LINKS-WRAPPER flex flex-col w-full px-2.5 gap-2">
          {links?.map((e) => {
            if (!e.url || !e.title) return;
            return (
              <ProfileLinkTab url={e.url} key={e.title}>
                <span>{e.title}</span>
              </ProfileLinkTab>
            );
          })}
        </div>
      </div>{" "}
    </div>
  );
};

export default Profile;
