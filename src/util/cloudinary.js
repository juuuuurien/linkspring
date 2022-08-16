const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
}); // Configure Cloudinary

const banner_storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "banners",
    allowedFormats: ["jpg", "png"],
    public_id: (req, file) => {
      return file.originalname; //fileName is the email@email.com-banner --> this is set from client at BannerModal.js
    },
  },
});

const avatar_storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowedFormats: ["jpg", "png"],
    public_id: (req, file) => {
      return file.originalname; //fileName is the email@email.com-avatar --> this is set from client at AvatarModal.js
    },
  },
});

const deleteImage = async (imgName) => {
  return await cloudinary.uploader.destroy(imgName, (result) => {
    console.log(result);
  });
};

module.exports = { cloudinary, banner_storage, avatar_storage };
