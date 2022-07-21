import React from "react";
import { PhotographIcon, TrashIcon } from "@heroicons/react/solid";
import EditableInput from "./EditableInput";

const LinkTab = ({ _id, handleDeleteLink, handleUpdateLink, url, title }) => {
  const handleSubmit = (formObj) => {
    const updateObj = { url, title };

    updateObj.url = formObj.url === "" ? "" : formObj.url || url; // if url is empty, update as empty string, otherwise it will just return the old title
    updateObj.title = formObj.title === "" ? "" : formObj.title || title;

    handleUpdateLink.mutate({ _id, updateObj });
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-[33px] py-4 px-6 gap-3">
      <div className="flex flex-col py-1">
        <EditableInput
          className={"font-bold"}
          data={title}
          label={"Title"}
          _id={_id}
          handleSubmit={handleSubmit}
        />
        <EditableInput data={url} label={"Url"} handleSubmit={handleSubmit} />
      </div>
      <div className="flex flex-row w-full justify-between">
        <PhotographIcon className="h-5 w-5 text-green-300 hover:text-green-400 cursor-pointer" />
        <TrashIcon
          onClick={() => handleDeleteLink.mutate(_id)}
          className="h-5 w-5 text-slate-300 hover:text-slate-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default LinkTab;
