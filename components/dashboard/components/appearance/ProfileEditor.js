import { Label, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";

const ProfileEditor = () => {
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  return (
    <div className="profile-wrapper">
      <h2>Profile</h2>
      <div className="flex flex-col p-5 gap-5 bg-white rounded-xl">
        <div className="flex flex-row gap-5">
          <div className="flexw-fit h-auto">
            <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
              <h1>JL</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
            <button className="flex flex-row w-auto h-fit rounded-lg p-2 bg-purple-500 hover:bg-purple-400 active:bg-purple-600 justify-center items-center text-slate-100 cursor-pointer">
              <h3>Pick an Image</h3>
            </button>
            <button className="flex flex-row w-auto h-fit rounded-lg p-2 bg-slate-200 hover:bg-slate-100 active:bg-slate-300 justify-center items-center  text-slate-600 cursor-pointer">
              <h3>Remove</h3>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label for="profile-title" className="text-xs text-slate-500">
            Profile Title
          </label>
          <TextInput
            onChange={handleTitleChange}
            onBlur={() => console.log("blurried")}
            value={title}
            maxLength={60}
            id="profile-title"
          />
          <div className="flex flex-col">
            <label for="bio" className="text-xs text-slate-500">
              Bio
            </label>
            <Textarea
              id="bio"
              onChange={handleBioChange}
              value={bio}
              maxLength={80}
            />
            <span className="self-end text-xs text-slate-800">
              {bio.length}/80
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
