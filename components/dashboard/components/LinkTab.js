import React, { useState, Fragment } from "react";
import {
  PhotographIcon,
  TrashIcon,
  ChevronUpIcon
} from "@heroicons/react/solid";
import TitleInput from "./TitleInput";
import URLInput from "./URLInput";

import { Dialog, Transition, Disclosure } from "@headlessui/react";

const DisclosureTab = ({ isOpen, setIsOpen, handleDeleteLink, _id }) => {
  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          <div className="flex flex-row w-full justify-between px-6">
            <PhotographIcon className="h-5 w-5 text-green-300 hover:text-green-400 cursor-pointer" />
            <Disclosure.Button className="">
              <TrashIcon className="h-5 w-5 text-slate-300 hover:text-slate-400 cursor-pointer" />
            </Disclosure.Button>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {open && (
              <Disclosure.Panel className="flex flex-col pt-4 pb-2 text-sm text-gray-900 text-center gap-4">
                <div className="DELETE HEAD w-full bg-slate-200 text-lg text-center font-semibold">
                  Delete
                </div>
                <span className="w-full">Delete forever?</span>
                <div className="flex flex-row px-5 gap-2">
                  <button
                    onClick={() => close()}
                    className="px-5 py-3 w-full bg-slate-200 rounded-[1000px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteLink.mutate(_id)}
                    className="px-5 py-3 w-full bg-slate-800 rounded-[1000px] text-white"
                  >
                    Delete
                  </button>
                </div>
              </Disclosure.Panel>
            )}
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

// handleDeleteLink.mutate(_id)

const LinkTab = ({ _id, handleDeleteLink, handleUpdateLink, url, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (formObj) => {
    const updateObj = { url, title };

    updateObj.url = formObj.url === "" ? "" : formObj.url || url; // if url is empty, update as empty string, otherwise it will just return the old title
    updateObj.title = formObj.title === "" ? "" : formObj.title || title;

    handleUpdateLink.mutate({ _id, updateObj });
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-[33px] py-4 gap-3">
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
        <DisclosureTab
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleDeleteLink={handleDeleteLink}
          _id={_id}
        />
      </div>
    </>
  );
};

export default LinkTab;
