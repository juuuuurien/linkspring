import React, { Fragment, useRef, useState } from "react";
import dataUriToBuffer from "data-uri-to-buffer";

import { Dialog, Transition } from "@headlessui/react";
import AvatarEditor from "react-avatar-editor";

const AvatarModal = ({
  modalVisible,
  setModalVisible,
  setAvatar,
  handleSubmit,
}) => {
  const [img, setImg] = useState(null);
  const [scale, setScale] = useState(1);

  const editorRef = useRef(null);

  const handleImageChange = (e) => {
    let reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // const handleSave = () => {
  //   // image will be saved as a dataURL string
  //   if (editorRef.current) {
  //     const canvas = editorRef.current.getImageScaledToCanvas();
  //     const dataURL = canvas.toBlob("image/png");
  //     // setAvatar(dataURL);
  //     //create form obj
  //     const formObj = {};
  //     formObj.avatar = dataURL;
  //   }
  // };

  const handleAvatarSubmit = async () => {
    // get image in dataURL format
    const canvas = editorRef.current.getImageScaledToCanvas();
    const dataURL = canvas.toDataURL("image/png");
    // ****** May refactor to use s3 buckets in the future ******
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

    const buf = dataUriToBuffer(dataURL);
    const formObj = {};
    formObj.avatar = buf;
    handleSubmit(formObj);

    // setAvatar(dataURL);
  };

  return (
    <Transition appear show={modalVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col w-auto px-[6rem] justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all gap-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Profile photo
                </Dialog.Title>
                <div className="flex flex-col w-full justify-center mt-2">
                  <AvatarEditor
                    ref={editorRef}
                    className="w-full h-full"
                    image={img}
                    width={300}
                    height={300}
                    border={[100, 25]}
                    borderRadius={10000}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={scale}
                    rotate={0}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <label>Zoom</label>
                  <input
                    type="range"
                    id="cowbell"
                    name="cowbell"
                    min="1"
                    max="1.5"
                    step="0.01"
                    onChange={(e) => setScale(e.target.value)}
                  />
                </div>

                <input
                  type="file"
                  multiple={false}
                  onChange={handleImageChange}
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      if (img) handleAvatarSubmit();
                      setModalVisible(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const ProfileEditor = ({ initialData, liveData, handleUpdateProfile }) => {
  const { username, profile } = initialData;

  const [avatar, setAvatar] = useState(null);
  const [title, setTitle] = useState(liveData?.title);
  const [bio, setBio] = useState(liveData?.bio);
  const [cache, setCache] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    const updatedProfile = { bio, title, avatar };

    updatedProfile.avatar =
      formObj.avatar === "" ? "" : formObj.avatar || avatar;
    updatedProfile.title = formObj.title === "" ? "" : formObj.title || title;
    updatedProfile.bio = formObj.bio === "" ? "" : formObj.bio || bio; // if url is empty, update as empty string, otherwise it will just use the old bio
    handleUpdateProfile.mutate(updatedProfile);
  };

  const handleBlur = (e) => {
    let formObj = {};
    formObj[e.target.id] = e.target.value;

    handleSubmit(formObj);
  };

  return (
    <>
      <div className="flex flex-col p-5 gap-5 bg-white rounded-xl">
        <div className="flex flex-row gap-5">
          <div className="flexw-fit h-auto">
            {liveData.avatar && (
              <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
                <img
                  src={
                    "data:image/png;base64," +
                    Buffer.from(liveData.avatar).toString("base64")
                  }
                  className="w-full h-full rounded-[50%]"
                ></img>
              </div>
            )}
            {!liveData.avatar && (
              <div className="flex justify-center items-center rounded-[50%] bg-gray-500 text-slate-100 w-[96px] h-[96px]">
                <h1>JL</h1>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
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
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-xs text-slate-500">
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
            <label htmlFor="bio" className="text-xs text-slate-500 ">
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
      <AvatarModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setAvatar={setAvatar}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default ProfileEditor;
