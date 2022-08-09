import React, { useState, Fragment } from "react";
import { unstable_getServerSession } from "next-auth/next";
import RightPreviewSection from "../../components/dashboard/RightPreviewSection";
import Sidebar from "../../components/dashboard/Sidebar";
import MainNavbar from "../../components/dashboard/MainNavbar";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

import { XIcon, PlusIcon } from "@heroicons/react/solid";

import Head from "next/head";

import { Button, Spinner } from "flowbite-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LinkTab from "../../components/dashboard/components/LinkTab";
import { authOptions } from "../api/auth/[...nextauth]";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dialog, Transition } from "@headlessui/react";

export default function Dashboard({ _session }) {
  // data contains  username, links, profile of the user
  const url = process.env.NEXT_PUBLIC_URL;
  const queryClient = useQueryClient();

  const [linkAnimationRef] = useAutoAnimate();

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

  // Link mutations:
  const getLinks = async () => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({ type: "get" }),
      })
    ).json();
  };

  const addLink = async () => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({ type: "add" }),
      })
    ).json();
  };

  const deleteLink = async (_id) => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({
          type: "delete",
          _id: _id,
        }),
      })
    ).json();
  };

  const updateLink = async (variables) => {
    const { _id, updateObj } = variables;

    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({
          type: "update",
          _id: _id,
          formData: updateObj,
        }),
      })
    ).json();
  };

  const handleAddLink = useMutation(addLink, {
    onMutate: async () => {
      await queryClient.cancelQueries(["links"]);
      const previousValue = queryClient.getQueryData(["links"]);

      // queryClient.setQueryData(["links"], (old) => ({
      //   ...old,
      //   links: [...old.links, { url: "", title: "" }],
      // }));
      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["links"], previousValue),
    // After success or failure, refetch the links
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  const handleDeleteLink = useMutation((_id) => deleteLink(_id), {
    onMutate: async (_id) => {
      await queryClient.cancelQueries(["links"]);
      const previousValue = queryClient.getQueryData(["links"]);

      queryClient.setQueryData(["links"], (old) => {
        const newLinks = old.links.filter((link) => link._id !== _id);
        return { ...old, links: newLinks };
      });

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["links"], previousValue),
    // After success or failure, refetch the links query
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  const handleUpdateLink = useMutation((variables) => updateLink(variables), {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["links"]);
      const previousValue = queryClient.getQueryData(["links"]);

      const { _id, formData } = variables;

      queryClient.setQueryData(["links"], (old) => {
        const newLinks = old.links.map((link) => {
          if (link._id === _id) {
            return { ...link, ...formData };
          }
          return link;
        });

        return { ...old, links: newLinks };
      });

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) => {
      queryClient.setQueryData(["links"], previousValue);
      console.log(err);
    },
    // After success or failure, refetch the links query
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  // query links
  const { data: linkData, isLoading } = useQuery(["links"], getLinks, {
    initialData: userdata?.links || [],
  });

  if (userLoading) {
    return <DashboardSkeleton />;
  }

  return (
    userdata && (
      <>
        <Head>
          <title>Linkspring | Dashboard</title>
          <meta name="description" content="Linkspring dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="main-wrapper flex flex-col md:flex-row h-screen w-screen overflow-y-auto">
          <Sidebar initialData={userdata} />
          <section className="flex flex-col items-center w-full h-full bg-gray-100 overflow-y-auto">
            <MainNavbar userdata={userdata} />
            <div className="MAINCONTENT WRAPPER mx-auto w-full h-full max-w-[640px]">
              <div className="flex flex-col items-center py-10 gap-12">
                <div
                  ref={linkAnimationRef}
                  className="flex flex-col w-full h-full gap-2 items-center"
                >
                  {isLoading && <Spinner />}
                  {linkData &&
                    linkData?.links?.map((e, i) => (
                      <LinkTab
                        key={e._id}
                        _id={e._id}
                        url={e.url}
                        title={e.title}
                        handleUpdateLink={handleUpdateLink}
                        handleDeleteLink={handleDeleteLink}
                      />
                    ))}
                  {linkData?.links?.length === 0 && (
                    <div className="flex w-full h-full justify-center items-center text-slate-500">
                      {"You have no links yet! Click the '+' to add some."}
                    </div>
                  )}
                  <button
                    className="text-lg font-semibold self-end bg-[#3395FF] rounded-[1000px] text-white px-8 py-2"
                    onClick={() => handleAddLink.mutate()}
                  >
                    {handleAddLink.isLoading ? (
                      <Spinner />
                    ) : (
                      <div className="w-fit flex flex-row items-center gap-2">
                        {"Add Link"}
                        <PlusIcon className="h-85 w-5" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
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
    )
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
