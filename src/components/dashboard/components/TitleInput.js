import React, { useCallback, useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";

const TitleInput = ({ label, className, data, handleSubmit }) => {
  const [editFocused, setEditFocused] = useState(false);
  const [value, setValue] = useState(data);
  const [cache, setCache] = useState(data);

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (editFocused) inputRef.current.focus();
  }, [editFocused]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.value === cache) {
      setEditFocused(false);
      return;
    }
    const obj = {};
    obj[label.toLowerCase()] = value;

    handleSubmit(obj);
    setEditFocused(false);
  };

  const handleFocus = (e) => {
    setCache(e.target.value);
    if (value === label) setValue("");
  };

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      inputRef.current.blur();
      setEditFocused(false);
    }
  };

  // prevent blur if click is inside the component (presses clear button)
  useEffect(() => {
    window.addEventListener("mousedown", (e) => {
      if (wrapperRef.current && wrapperRef.current.contains(e.target))
        e.preventDefault();
    });
  });

  return (
    <div ref={wrapperRef} className={`flex flex-row items-center ${className}`}>
      {editFocused === false ? (
        <button
          className={`flex flex-row items-center gap-2 p-1 ${
            value === "" ? "text-slate-400" : "text-slate-800"
          }`}
          onClick={() => {
            setEditFocused(true);
          }}
        >
          {value === "" ? label : value}{" "}
          <PencilIcon className="h-4 w-4 text-slate-400" />
        </button>
      ) : (
        <>
          <input
            placeholder={label}
            ref={inputRef}
            onChange={handleChange}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleEnter}
            tabIndex={0}
            className={`rounded-md font-semibold focus:ring-0 p-1 focus:outline-none w-full ${
              value === label ? "text-slate-400" : "text-slate-800"
            }`}
          />
          <div
            className="text-slate-600 cursor-pointer p-1 rounded-md hover:bg-slate-200"
            onClick={(e) => {
              setValue("");
            }}
          >
            Clear
          </div>
        </>
      )}
    </div>
  );
};

export default TitleInput;
