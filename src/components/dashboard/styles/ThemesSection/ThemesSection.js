import React, { useEffect, useState, Fragment } from "react";
import { ChromePicker } from "react-color";
import { Popover } from "@headlessui/react";

import { THEMES } from "./util";
import ColorPickerButton from "./ColorPickerButton";

const ThemesSection = ({ themeData, userdata, handleUpdateTheme }) => {
  const [bgColorPicker, setBgColorPicker] = useState(
    userdata?.backgroundColor || themeData?.backgroundColor
  );
  const [profileTextColorPicker, setProfileTextColorPicker] = useState(
    userdata?.profileTextColor || themeData?.profileTextColor
  );
  const [tabColorPicker, setTabColorPicker] = useState(
    userdata?.tabColor || themeData?.tabColor
  );
  const [tabTextColorPicker, setTabTextColorPicker] = useState(
    userdata?.tabTextColor || themeData.tabTextColor
  );

  useEffect(() => {
    setBgColorPicker(userdata?.backgroundColor || themeData?.backgroundColor);
    setProfileTextColorPicker(
      userdata?.profileTextColor || themeData?.profileTextColor
    );
    setTabColorPicker(userdata?.tabColor || themeData?.tabColor);
    setTabTextColorPicker(userdata?.tabTextColor || themeData.tabTextColor);
  }, [userdata, themeData]);

  const handleChangeBackroundColor = (updateObj) => {
    // obj is either { backgroundColor: color.hex} or { profileTextColor: color.hex}

    const newTheme = {
      ...themeData,
      ...updateObj,
    };

    handleUpdateTheme.mutate(newTheme);
  };
  const handleChangeTabColor = (updateObj) => {
    // obj is either { tabColor: color.hex} or { tabTextColor: color.hex}
    const newTheme = {
      ...themeData,
      ...updateObj,
    };

    handleUpdateTheme.mutate(newTheme);
  };

  return (
    <div className=" flex flex-col bg-white p-5 gap-10 rounded-xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">Layout</h2>
        <div className="flex flex-row gap-4">
          <button className="flex flex-col justify-center items-center w-fit  bg-sky-200 rounded-xl p-2">
            <div className=" hover:scale-[1.1] transition-all hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]">
              <span className="text-[0.8rem] text-gray-500">Avatar Left</span>
              <div className="flex gap-2">
                <div className="flex flex-col justify-start h-[6rem] w-[4.3rem] border-4 bg-gray-200 border-gray-400 rounded-2xl overflow-hidden">
                  <div className="w-full h-[28%] bg-gray-300"></div>
                  <div className="bg-gray-400 h-[1.55rem] w-[1.55rem] rounded-[100%] mt-[-20%] mx-1"></div>
                </div>
              </div>
            </div>
          </button>
          <button className="flex flex-col justify-center items-center w-fit border-4rounded-xl p-2">
            <div className=" hover:scale-[1.1] transition-all hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]">
              <span className="text-[0.8rem] text-gray-500">Avatar Center</span>
              <div className="flex gap-2">
                <div className="flex flex-col h-[6rem] w-[4.3rem] border-4 bg-gray-200 border-gray-400 rounded-2xl overflow-hidden">
                  <div className=" w-full h-[28%] bg-gray-300"></div>
                  <div className="self-center bg-gray-400 h-[1.55rem] w-[1.55rem] rounded-[100%] mt-[-20%] mx-1"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className="flex flex-row gap-4">
          <button className="flex flex-col justify-center items-center w-fit bg-sky-200 rounded-xl p-2">
            <div className="flex flex-col gap-2 hover:scale-[1.1] transition-all hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]">
              <span className="text-[0.8rem] text-gray-500">Tab List</span>
              <div className="flex justify-center items-center w-[4.3rem] h-[6rem] gap-2">
                <div className="flex flex-col w-[4.3rem] gap-2">
                  <div className="w-full h-2 bg-gray-400" />
                  <div className="w-full h-2 bg-gray-400" />
                  <div className="w-full h-2 bg-gray-400" />
                </div>
              </div>
            </div>
          </button>
          <button className="flex flex-col justify-center items-center w-fit rounded-xl p-2">
            <div className="flex flex-col gap-2 hover:scale-[1.1] transition-all hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]">
              <span className="text-[0.8rem] text-gray-500">Tab Grid</span>
              <div className="flex justify-center items-center w-[4.3rem] h-[6rem] gap-2">
                <div className="grid grid-rows-3 grid-cols-3 w-[3rem] h-[3rem] gap-2">
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                  <div className="w-full h-full bg-gray-400" />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">Colors</h2>
        <div className="flex gap-1">
          <Popover className="relative">
            <ColorPickerButton
              label="Background"
              color={themeData.backgroundColor}
            />
            <Popover.Panel className="absolute top-[100%] z-10">
              <ChromePicker
                color={bgColorPicker}
                onChange={(color, event) => setBgColorPicker(color.hex)}
                onChangeComplete={(color, event) => {
                  const updateObj = {
                    backgroundColor: color.hex,
                  };
                  handleChangeBackroundColor(updateObj);
                  setBgColorPicker(color.hex);
                }}
              />
            </Popover.Panel>
          </Popover>
          <Popover className="relative">
            <ColorPickerButton
              label="Profile Text"
              color={themeData.profileTextColor}
            />
            <Popover.Panel className="absolute top-[100%] z-10">
              <ChromePicker
                color={profileTextColorPicker}
                onChange={(color, event) =>
                  setProfileTextColorPicker(color.hex)
                }
                onChangeComplete={(color, event) => {
                  const updateObj = {
                    profileTextColor: color.hex,
                  };
                  handleChangeBackroundColor(updateObj);
                  setProfileTextColorPicker(color.hex);
                }}
              />
            </Popover.Panel>
          </Popover>

          <Popover className="relative">
            <ColorPickerButton label="Tab" color={themeData.tabColor} />
            <Popover.Panel className="absolute top-[100%] z-10">
              <ChromePicker
                color={tabColorPicker}
                onChange={(color, event) => setTabColorPicker(color.hex)}
                onChangeComplete={(color, event) => {
                  const updateObj = {
                    tabColor: color.hex,
                  };
                  handleChangeTabColor(updateObj);
                  setTabColorPicker(color.hex);
                }}
              />
            </Popover.Panel>
          </Popover>
          <Popover className="relative">
            <ColorPickerButton
              label="Tab Text"
              color={themeData.tabTextColor}
            />
            <Popover.Panel className="absolute top-[100%] z-10">
              <ChromePicker
                color={tabTextColorPicker}
                onChange={(color, event) => setTabTextColorPicker(color.hex)}
                onChangeComplete={(color, event) => {
                  const updateObj = {
                    tabTextColor: color.hex,
                  };
                  handleChangeTabColor(updateObj);
                  setTabTextColorPicker(color.hex);
                }}
              />
            </Popover.Panel>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">Templates</h2>
        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-4">
          {THEMES.map((theme, index) => (
            <button
              onClick={() => handleUpdateTheme.mutate(theme)}
              key={index}
              style={{
                background: theme.backgroundColor,
              }}
              className={`flex gap-2 pb-6 justify-center min-h-[200px] flex-shrink-0 grow min-w-[80px] rounded-lg flex-col items-center focus:outline-none self-stretch ${theme.tabTextColor} border-[1px] border-gray-300 hover:scale-105 transition-all duration-200 ease-[cubic-bezier(1,-0.32,0,1.59)] animate-bg-gradient`}
            >
              <span
                style={{
                  backgroundColor: theme.tabColor,
                }}
                className={`h-5 w-[80%] rounded-sm text-xs font-bold`}
              />
              <span
                style={{
                  backgroundColor: theme.tabColor,
                }}
                className={`h-5 w-[80%] rounded-sm text-xs font-bold`}
              />
              <span
                style={{
                  backgroundColor: theme.tabColor,
                }}
                className={`h-5 w-[80%] rounded-sm text-xs font-bold`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemesSection;
