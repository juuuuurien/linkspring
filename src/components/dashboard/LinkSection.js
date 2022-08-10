import React, { useState, Fragment } from "react";
import { XIcon, PlusIcon } from "@heroicons/react/solid";

import { Button, Spinner } from "flowbite-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LinkTab from "../../components/dashboard/components/LinkTab";

import { useAutoAnimate } from "@formkit/auto-animate/react";

const LinkSection = ({ initialData }) => {
  const queryClient = useQueryClient();
  const [linkAnimationRef] = useAutoAnimate();

  const getLinks = async () => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({ type: "get" }),
      })
    ).json();
  };

  const { data: linkData, isLoading } = useQuery(["links"], getLinks, {
    initialData: initialData || [],
  });

  // Link service calls:
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

  //   link mutations
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

  if (!initialData)
    return (
      <div className="flex flex-col h-full justify-center items-center py-10 gap-12">
        <div className="flex flex-col w-full h-full gap-2 items-center">
          <div className="flex flex-col justify-evenly w-full h-32 rounded-2xl bg-gray-200 animate-pulse p-4">
            <div className="w-[33%] h-5 rounded-lg    bg-gray-100" />
            <div className="w-[66%] h-5 rounded-lg    bg-gray-100" />
            <div className="flex flex-row justify-between">
              <div className="w-5 h-5 rounded-lg    bg-gray-100" />
              <div className="w-5 h-5 rounded-lg    bg-gray-100" />
            </div>
          </div>
          <div className="flex flex-col justify-evenly w-full h-32 rounded-2xl bg-gray-200 animate-pulse p-4">
            <div className="w-[33%] h-5 rounded-lg    bg-gray-100" />
            <div className="w-[66%] h-5 rounded-lg    bg-gray-100" />
            <div className="flex flex-row justify-between">
              <div className="w-5 h-5 rounded-lg    bg-gray-100" />
              <div className="w-5 h-5 rounded-lg    bg-gray-100" />
            </div>
          </div>
          <div className="flex flex-col justify-evenly w-full h-32 rounded-2xl bg-gray-200 animate-pulse p-4">
            <div className="w-[33%] h-5 rounded-lg    bg-gray-100" />
            <div className="w-[66%] h-5 rounded-lg    bg-gray-100" />
            <div className="flex flex-row justify-between">
              <div className="w-5 h-5 rounded-lg    bg-gray-100" />
              <div className="w-5 h-5 rounded-lg    bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    initialData && (
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
            className="text-lg font-semibold self-end bg-[#3395FF] rounded-[14px] text-white px-8 py-2"
            onClick={() => handleAddLink.mutate()}
          >
            {handleAddLink.isLoading ? (
              <Spinner />
            ) : (
              <div className="w-fit flex flex-row items-center gap-2">
                {"New Link"}
                <PlusIcon className="h-85 w-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    )
  );
};

export default LinkSection;
