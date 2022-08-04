import React, { useState, Fragment } from "react";
import {
  PhotographIcon,
  TrashIcon,
  ChevronUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import TitleInput from "./TitleInput";
import URLInput from "./URLInput";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Dialog, Transition, Disclosure } from "@headlessui/react";

const BottomBar = ({ isOpen, setIsOpen, handleDeleteLink, _id }) => {
  const [parent] = useAutoAnimate();

  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          <div className="flex flex-row w-full justify-between px-6">
            <PhotographIcon className="h-5 w-5 text-green-300 hover:text-green-400 cursor-pointer" />
            <Disclosure.Button>
              <TrashIcon className="h-5 w-5 text-slate-300 hover:text-slate-400 cursor-pointer" />
            </Disclosure.Button>
          </div>
          {/* <Transition
            ref={parent}
            // enter="transition duration-100 ease-out"
            // enterFrom="transform height-[0px] translate-y-[-20px] opacity-20"
            // enterTo="transform height-[100px] translate-y-[0px] opacity-100"
            // leave="transition duration-100 ease-out"
            // leaveFrom="transform translate-y-[0px] opacity-100"
            // leaveTo="transform translate-y-[-10px] opacity-0"
          > */}
          <div ref={parent}>
            <Disclosure.Panel className="flex flex-col pt-4 pb-2 text-sm text-gray-900 text-center gap-4">
              <div className="DELETE HEAD flex flex-row justify-center items-center w-full bg-slate-200 text-lg text-center font-semibold">
                Delete
                <Disclosure.Button className="absolute right-3 h-4 w-4 text-slate-700 hover:text-slate-500 cursor-pointer">
                  <XIcon onClick={close} />
                </Disclosure.Button>
              </div>
              <span className="w-full">Delete forever?</span>
              <div className="flex flex-row px-5 gap-2">
                <Disclosure.Button className="px-5 py-3 w-full bg-slate-200 rounded-[1000px]">
                  Cancel
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={() => handleDeleteLink.mutate(_id)}
                  className="px-5 py-3 w-full bg-slate-800 rounded-[1000px] text-white"
                >
                  Delete
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </div>
          {/* </Transition> */}
        </>
      )}
    </Disclosure>
  );
};

const LinkTab = ({ _id, handleDeleteLink, handleUpdateLink, url, title }) => {
  const handleSubmit = (formObj) => {
    const updateObj = { url, title };

    updateObj.url = formObj.url === "" ? "" : formObj.url || url; // if url is empty, update as empty string, otherwise it will just return the old title
    updateObj.title = formObj.title === "" ? "" : formObj.title || title;

    handleUpdateLink.mutate({ _id, updateObj });
  };

  return (
    <>
      <div
        className={`flex flex-col w-full h-auto bg-white rounded-[33px] py-4 gap-3 justify-between transition-all ease-in-out duration-200 `}
      >
        <div className="flex flex-col py-1 px-6">
          <TitleInput
            className={"font-bold"}
            data={title}
            label={"Title"}
            _id={_id}
            handleSubmit={handleSubmit}
          />
          <URLInput data={url} label={"Url"} handleSubmit={handleSubmit} />
        </div>
        <BottomBar handleDeleteLink={handleDeleteLink} _id={_id} />
      </div>
    </>
  );
};

export default LinkTab;
