import { compare } from "bcryptjs";
import User from "../../../models/User";
import { compareHash } from "../../../util/bcrypt";
import dbConnect from "../../../util/mongoose";

export default async function handler(req, res) {
  console.log(req.body, "this is the body dsafsdasfasdfasdfasdfasdfasdfsdaf");

  let { email, username, password } = JSON.parse(req.body);
  console.log(email, username, password, "checking parsed body");
  await dbConnect();

  let emailExists;

  // need to check if email exists or not...
  if (!email && username) {
    console.log(username, "this is username when email is not provided");
    const userdataFromUsername = await User.findOne({ username: username });
    email = userdataFromUsername.email;
    emailExists = await User.exists({ email: email });
  }

  if (email && !username) {
    emailExists = await User.exists({ email: email });
    console.log(emailExists, "this is from googauth");
  }

  if (!emailExists) res.send({ status: 404, error: "User does not exist" });

  if (emailExists && password) {
    // Any object returned will be saved in `user` property of the JWT
    const data = await User.findOne({ email: email });
    console.log(data);
    const isValid = await compare(password, data.password);

    if (!isValid) res.send({ success: false, error: "Invalid password" });
    if (isValid) res.status(200).json({ success: true, data: data });
  }

  if (emailExists && !password) {
    // Any object returned will be saved in `user` property of the JWT
    const data = await User.findOne({ email: email });

    res.status(200).json({ success: true, data: data });
  }
}
