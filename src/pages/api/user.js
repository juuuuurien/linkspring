import { unstable_getServerSession } from "next-auth";
import User from "../../models/User";
import dbConnect from "../../util/mongoose";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const _email = body.email;
  await dbConnect();

  const user = await User.findOne({
    email: { $regex: new RegExp(_email, "i") },
  });
  const { username, email, links, profile, theme } = user;
  res.json({ username, email, links, profile, theme });
}
