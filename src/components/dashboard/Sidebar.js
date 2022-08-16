import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "../../../public/assets/linkspring_logo.svg";

const Sidebar = ({ initialData }) => {
  return (
    <section className="flex md:flex-col justify-between items-center py-5 h-[60px] w-full md:h-full md:w-[100px] bg-white border border-gray-200 z-10">
      {!initialData?.profile && (
        <>
          <div className="flex justify-center items-center rounded-[100%] h-[48px] w-[48px] bg-gray-300 animate-pulse">
            <h1></h1>
          </div>
          <Link href="/dashboard">
            <a>
              <div className="flex justify-center items-center rounded-[100%] h-[48px] w-[48px] bg-gray-400 animate-pulse"></div>
            </a>
          </Link>
        </>
      )}
      {initialData?.profile && (
        <>
          <Link href="/">
            <a>
              <div className="flex justify-center items-center rounded-[100%] h-[48px] w-[48px]">
                <Image
                  alt="logo"
                  src={"/assets/linkspring_logo.svg"}
                  height={48}
                  width={48}
                  className="p-0"
                />
              </div>
            </a>
          </Link>
          {!initialData?.profile?.avatar && (
            <Link href="/dashboard">
              <a>
                <div className="flex justify-center items-center rounded-[100%] overflow-hidden h-[48px] w-[48px] bg-gray-600">
                  <h1>JL</h1>
                </div>
              </a>
            </Link>
          )}
          {initialData?.profile?.avatar && (
            <Link href="/dashboard">
              <a>
                <div className="flex justify-center items-center rounded-[100%] overflow-hidden h-[48px] w-[48px] bg-gray-600">
                  <Image
                    alt="avatar"
                    src={initialData?.profile.avatar}
                    height={48}
                    width={48}
                  />
                </div>
              </a>
            </Link>
          )}
        </>
      )}
    </section>
  );
};

export default Sidebar;
