import nextConnect from "next-connect";
import multer from "multer";
import { avatar_storage } from "../../util/cloudinary";

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({ storage: avatar_storage });

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Adds the middleware to Next-Connect
apiRoute.use(upload.single("avatar_image"));

// Process a POST request
apiRoute.post((req, res) => {
  console.log(req.file);
  res.status(200).json({ data: "success", path: req.file.path });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
