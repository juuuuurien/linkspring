import React, { useEffect, useRef, useState } from "react";
import { PhotographIcon, TrashIcon, LinkIcon } from "@heroicons/react/solid";
import EditableInput from "./EditableInput";

const LinkTab = ({ _id, handleDeleteLink, url, title }) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-[33px] py-4 px-6 gap-3">
      <div className="flex flex-col py-1">
        <EditableInput
          className={"font-bold"}
          data={title}
          label={"Title"}
          _id={_id}
        />
        <EditableInput data={url} label={"Url: "} />
      </div>
      <div className="flex flex-row w-full justify-between">
        <PhotographIcon className="h-5 w-5 text-slate-300 hover:text-slate-400 cursor-pointer" />
        <TrashIcon
          onClick={() => handleDeleteLink.mutate(_id)}
          className="h-5 w-5 text-slate-300 hover:text-slate-400 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default LinkTab;
