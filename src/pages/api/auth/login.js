import { compare } from "bcryptjs";
import User from "../../../models/User";
import { compareHash } from "../../../util/bcrypt";
import dbConnect from "../../../util/mongoose";

export default async function handler(req, res) {
  const { username, password } = req.body;
  await dbConnect();

  const user = await User.exists({ username: username });
  if (!user) res.send({ status: 404, error: "User does not exist" });

  if (user) {
    // Any object returned will be saved in `user` property of the JWT
    const data = await User.findById(user);
    const isValid = await compare(password, data.password);

    if (!isValid) res.send({ success: false, error: "Invalid password" });
    if (isValid) res.status(200).json({ success: true, data: data });
  }
}
