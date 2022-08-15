import React, { Fragment, useRef, useState } from "react";
import dataUriToBuffer from "data-uri-to-buffer";

import { XIcon } from "@heroicons/react/solid";
import { CameraIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";

import { Dialog, Transition } from "@headlessui/react";
import AvatarEditor from "react-avatar-editor";
import BannerModal from "./BannerModal";
import AvatarModal from "./AvatarModal";

import { Spinner } from "flowbite-react";

const ProfileEditor = ({
  initialData,
  liveData,
  handleUpdateProfile,
  isProfileLoading,
}) => {
  const { username, profile } = initialData;

  const [avatar, setAvatar] = useState(profile.avatar);
  const [banner, setBanner] = useState(profile.banner);
  const [title, setTitle] = useState(profile.title);
  const [bio, setBio] = useState(profile.bio);
  // const [cache, setCache] = useState(null); // used to use this to save data on input focus in case it needed to be restored
  const [bannerModalVisible, setBannerModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  // const handleFocus = (e) => {
  //   setCache(e.target.value);
  // };

  const handleSubmit = async (formObj) => {
    // bundle any data coming from the form into a single object
    const updatedProfile = { bio, title, avatar, banner };

    updatedProfile.avatar = formObj.avatar ? formObj.avatar : liveData.avatar; // if updating avatar, use formObj.avatar, otherwise use old avatar in liveData
    updatedProfile.banner = formObj.banner ? formObj.banner : liveData.banner;
    updatedProfile.title = formObj.title === "" ? "" : formObj.title || title;
    updatedProfile.bio = formObj.bio === "" ? "" : formObj.bio || bio; // if url passed is empty, update as empty string, otherwise it will just use the old bio

    // finally make api call to update with object of data
    await handleUpdateProfile.mutate(updatedProfile);
  };

  const handleBlur = (e) => {
    let formObj = {};
    formObj[e.target.id] = e.target.value;

    handleSubmit(formObj);
  };

  const handleAvatarSubmit = async (dataURL) => {
    // should accpept a dataURL.
    // const canvas = editorRef.current.getImageScaledToCanvas();
    // const dataURL = canvas.toDataURL("image/png");
    // ****** May refactor to use s3 buckets in the future ******
    //  *********************************************************
    // get secure connection URL to aws bucket
    // const { url } = await fetch("/api/s3").then((res) => res.json());
    // make a PUT request to that URL to store image
    // await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "Access-Control-Allow-Origin": true,
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: dataURL,
    // });
    // const imageUrl = url.split("?")[0];
    // console.log(imageUrl);
    // const formObj = {};
    // formObj.avatar = imageUrl;
    // handleSubmit(imageUrl);
    // const buf = dataUriToBuffer(dataURL);
    // const formObj = {};
    // formObj.avatar = buf;
    // setAvatar(buf);
    // handleSubmit(formObj);
  };

  return (
    <>
      <div className="relative flex flex-col gap-5 bg-white rounded-xl">
        <div className="flex flex-col gap-5">
          <div className="BG-PICTURE-WRAPPER relative flex justify-center items-center">
            <button
              onClick={() => setBannerModalVisible(true)}
              className="absolute mt-5 w-10 h-10 bg-slate-900 p-2 rounded-[100%] opacity-60 hover:opacity-50 hover:bg-slate-600 transition-all"
            >
              <CameraIcon className="text-slate-200" />
            </button>
            <div className="flex content-[''] h-[164px] bg-gray-500 w-full mb-4 rounded-t-3xl">
              {liveData.banner && (
                <div className="flex w-full justify-center items-center bg-gray-500 text-slate-100 rounded-t-3xl">
                  <img
                    src={liveData.banner}
                    className="object-cover w-full h-full rounded-t-3xl"
                  ></img>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex justify-center items-center w-fit h-auto mt-[-96px] px-5">
            <button
              onClick={() => setAvatarModalVisible(true)}
              className="absolute mt-10 w-full h-full flex justify-center items-center"
            >
              <CameraIcon className=" w-10 h-10 mt-5 text-slate-200 bg-slate-900 p-2 rounded-[100%] opacity-60 hover:opacity-50 hover:bg-slate-600 transition-all" />
            </button>
            {liveData.avatar && (
              <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[126px] h-[126px] border-white border-4">
                <img
                  src={liveData.avatar}
                  className="w-full h-full rounded-[50%]"
                ></img>
              </div>
            )}
            {!liveData.avatar && (
              <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[126px] h-[126px] border-white border-4">
                <UserIcon className="w-10 h-10 text-gray-100" />
              </div>
            )}
          </div>

          {/* <div className="flex flex-col gap-2 w-full h-full">
            <button
              className="flex flex-row w-auto h-fit rounded-lg p-2 bg-purple-500 hover:bg-purple-400 justify-center items-center text-slate-100 cursor-pointer"
              onClick={() => setModalVisible(true)}
            >
              <h3>Pick an Image</h3>
            </button>
            <button
              className="flex flex-row w-auto h-fit rounded-lg p-2 bg-slate-200 hover:bg-slate-100 justify-center items-center  text-slate-600 cursor-pointer"
              onClick={() => setAvatar(null)}
            >
              <h3>Remove</h3>
            </button>
          </div> */}
        </div>
        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="title" className="text-xs text-slate-500">
            Profile Title
          </label>
          <input
            type={"title"}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            // onFocus={handleFocus}
            value={title}
            maxLength={60}
            id="title"
            className="border-b-2 border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-0"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-xs text-slate-500 ">
              Bio
            </label>
            <textarea
              type={"bio"}
              id="bio"
              onChange={handleBioChange}
              onBlur={handleBlur}
              // onFocus={handleFocus}
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
      {isProfileLoading && (
        <div className="absolute flex justify-center items-center h-full w-full bg-[#cccccc30]">
          <Spinner />
        </div>
      )}
      <AvatarModal
        modalVisible={avatarModalVisible}
        setModalVisible={setAvatarModalVisible}
        handleSubmit={handleSubmit}
        handleUpdateProfile={handleUpdateProfile}
      />
      <BannerModal
        modalVisible={bannerModalVisible}
        setModalVisible={setBannerModalVisible}
        handleSubmit={handleSubmit}
        handleUpdateProfile={handleUpdateProfile}
      />
    </>
  );
};

export default ProfileEditor;
