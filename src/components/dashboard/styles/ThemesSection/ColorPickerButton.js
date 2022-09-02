import React from "react";
import { Popover } from "@headlessui/react";

const ColorPickerButton = ({ color, label }) => {
  return (
    <div className="flex w-20 gap-2 flex-col justify-center items-center">
      <span className="text-[0.8rem] text-gray-500">{label}</span>
      <Popover.Button
        style={{
          backgroundColor: color,
        }}
        className={`h-10 w-10 rounded-[100%] border-2 border-black`}
      />
    </div>
  );
};

export default ColorPickerButton;
