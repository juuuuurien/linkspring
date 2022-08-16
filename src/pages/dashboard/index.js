import React, { useState, Fragment } from "react";
import { unstable_getServerSession } from "next-auth/next";
import RightPreviewSection from "../../components/dashboard/RightPreviewSection";
import Sidebar from "../../components/dashboard/Sidebar";
import MainNavbar from "../../components/dashboard/MainNavbar";

import { XIcon, PlusIcon } from "@heroicons/react/solid";

import Head from "next/head";

import { useQuery, useQueryClient } from "react-query";

import { authOptions } from "../api/auth/[...nextauth]";

import { Dialog, Transition } from "@headlessui/react";
import LinkSection from "../../components/dashboard/LinkSection";

export default function Dashboard({ _session }) {
  // data contains  username, links, profile of the user
  let [isOpen, setIsOpen] = useState(false);

  // get user data
  const { data: userdata, isLoading: userLoading } = useQuery(
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

  const getLinks = async () => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({ type: "get" }),
      })
    ).json();
  };

  const { data: linkData, isLoading } = useQuery(["links"], getLinks, {
    initialData: userdata?.links || [],
  });

  return (
    <>
      <Head>
        <title>Linkspring - Dashboard</title>
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
          <MainNavbar userdata={userdata} />
          <div className="MAINCONTENT WRAPPER mx-auto w-full h-full max-w-[640px]">
            <LinkSection initialData={userdata?.links} liveData={linkData} />
          </div>
        </section>
        <div className="hidden md:flex flex-col items-center max-w-[33%] w-full h-auto bg-gray-100 border border-gray-200 z-10 ">
          <RightPreviewSection initialData={userdata} liveData={linkData} />
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
                      className="self-end w-10 h-10 bg-gray-200 text-slate-600 p-2 hover:scale-[1.1] text-lg font-medium leading-6 rounded-[100%]"
                    >
                      <XIcon />
                    </button>
                    <div>
                      <RightPreviewSection
                        initialData={userdata}
                        liveData={linkData}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed self-center bottom-10 rounded-[10000px] text-slate-900 font-bold text-xl z-10 bg-indigo-300 px-4 py-2"
        >
          Preview
        </button>
      </div>
    </>
  );
}

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
