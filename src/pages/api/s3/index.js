import { generateUploadURL } from "../../../../s3";

export default async function handler(req, res) {
  const url = await generateUploadURL();
  res.send({ url });
}
