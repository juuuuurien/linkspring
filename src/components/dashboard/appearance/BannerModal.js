import React, { Fragment, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import AvatarEditor from "react-avatar-editor";

const BannerModal = ({ modalVisible, setModalVisible, handleSubmit }) => {
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

  return (
    <Transition appear show={modalVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModalVisible(false)}
      >
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
                  {!img && (
                    <div className="flex justify-center items-center h-[200px] w-[600px] text-gray-400 bg-gray-100 rounded-2xl border-2 border-gray-400 border-dashed">
                      Browse to select a picture...
                    </div>
                  )}
                  {img && (
                    <AvatarEditor
                      ref={editorRef}
                      className="w-full h-full"
                      image={img}
                      width={600}
                      height={300}
                      border={[100, 25]}
                      color={[255, 255, 255, 0.6]} // RGBA
                      scale={scale}
                      rotate={0}
                    />
                  )}
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
                <form>
                  <input
                    type="file"
                    multiple={false}
                    onChange={handleImageChange}
                  />
                  <div className="flex flex-row gap-5 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        if (img) {
                          const canvas =
                            editorRef.current.getImageScaledToCanvas();
                          const dataURL = canvas.toDataURL("image/png");
                          handleSubmit(dataURL);
                        }
                        setModalVisible(false);
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModalVisible(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default BannerModal;
