import { Label, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";

const ProfileEditor = ({ initialData, liveData, handleUpdateProfile }) => {
  const { username, profile } = initialData;

  const [title, setTitle] = useState(liveData?.title);
  const [bio, setBio] = useState(liveData?.bio);
  const [cache, setCache] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleFocus = (e) => {
    setCache(e.target.value);
  };

  const handleSubmit = (formObj) => {
    const updatedProfile = { bio, title };

    updatedProfile.title = formObj.title === "" ? "" : formObj.title || title;
    updatedProfile.bio = formObj.bio === "" ? "" : formObj.bio || bio; // if url is empty, update as empty string, otherwise it will just return the old title

    handleUpdateProfile.mutate(updatedProfile);
  };

  const handleBlur = (e) => {
    let formObj = {};
    formObj[e.target.id] = e.target.value;

    handleSubmit(formObj);
  };

  return (
    <div className="profile-wrapper">
      <h2 className="text-xl">Profile</h2>
      <div className="flex flex-col p-5 gap-5 bg-white rounded-xl">
        <div className="flex flex-row gap-5">
          <div className="flexw-fit h-auto">
            <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
              <h1>JL</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
            <button className="flex flex-row w-auto h-fit rounded-lg p-2 bg-purple-500 hover:bg-purple-400 justify-center items-center text-slate-100 cursor-pointer">
              <h3>Pick an Image</h3>
            </button>
            <button className="flex flex-row w-auto h-fit rounded-lg p-2 bg-slate-200 hover:bg-slate-100 justify-center items-center  text-slate-600 cursor-pointer">
              <h3>Remove</h3>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label for="title" className="text-xs text-slate-500">
            Profile Title
          </label>
          <input
            type={"title"}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={title}
            maxLength={60}
            id="title"
            className="border-b-2 border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-0"
          />
          <div className="flex flex-col gap-2">
            <label for="bio" className="text-xs text-slate-500 ">
              Bio
            </label>
            <textarea
              type={"bio"}
              id="bio"
              onChange={handleBioChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={bio}
              maxLength={80}
              className="w-full h-auto rounded-lg border-2 border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-0"
            />
            <span className="self-end text-xs text-slate-800">
              {bio?.length}/80
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
