import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";


import {
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/solid";

import Logo from "../../../public/assets/linkspring_logo.svg";

const Sidebar = ({ initialData }) => {
  const menu = ["Settings", "Log out"];

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
          <Menu as="div" className="relative">
            <Menu.Button>
              {!initialData?.profile?.avatar && (
                <div className="flex justify-center items-center rounded-[100%] overflow-hidden h-[48px] w-[48px] bg-gray-600">
                  <h1>JL</h1>
                </div>
              )}
              {initialData?.profile?.avatar && (
                <div className="flex justify-center items-center rounded-[100%] overflow-hidden h-[48px] w-[48px] bg-gray-600">
                  <Image
                    alt="avatar"
                    src={initialData?.profile.avatar}
                    height={48}
                    width={48}
                  />
                </div>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items>
                <div className="absolute bg-white right-0 top-0 translate-x-[110%] translate-y-[-100%] p-5 shadow-md">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL })
                        }
                        className={`${
                          active ? "bg-gray-200" : null
                        } flex gap-5 text-gray-900 group w-full justify-center items-center rounded-md px-2 py-2 text-md font-semibold whitespace-nowrap`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Log Out
                        <ChevronRightIcon className="font-semibold text-md h-6 w-6" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-200" : null
                        } flex gap-5 text-gray-900 group w-full justify-center items-center rounded-md px-2 py-2 text-md font-semibold whitespace-nowrap`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                        <ChevronRightIcon className="font-semibold text-md h-6 w-6" />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </>
      )}
    </section>
  );
};

export default Sidebar;
