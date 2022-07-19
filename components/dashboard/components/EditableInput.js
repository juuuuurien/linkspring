import React, { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";

const EditableInput = ({ label, className, data }) => {
  const [editFocused, setEditFocused] = useState(false);
  const [value, setValue] = useState(data === "" ? label : data);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editFocused) inputRef.current.focus();
  }, [editFocused]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.value === "") setValue(label);
    setEditFocused(false);
  };

  const handleFocus = () => {
    console.log(value === label);
    if (value === label) setValue("");
  };

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      inputRef.current.blur();
      setEditFocused(false);
    }
  };

  return (
    <div className={`flex flex-row items-center ${className}`}>
      {editFocused === false ? (
        <button
          className={`flex flex-row items-center gap-2 p-1 ${
            value === label ? "text-slate-400" : "text-slate-800"
          }`}
          onClick={() => {
            setEditFocused(true);
          }}
        >
          {value} <PencilIcon className="h-5 w-5" />
        </button>
      ) : (
        <input
          ref={inputRef}
          onChange={handleChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleEnter}
          className={`rounded-md font-semibold focus:ring-0 p-1 focus:outline-none w-full ${
            value === label ? "text-slate-400" : "text-slate-800"
          }`}
        />
      )}
    </div>
  );
};

export default EditableInput;
