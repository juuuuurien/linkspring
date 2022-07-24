import { compare } from "bcryptjs";
import User from "../../../models/User";
import { compareHash } from "../../../util/bcrypt";
import dbConnect from "../../../util/mongoose";

export default async function handler(req, res) {
  const { username, password } = req.body;
  await dbConnect();

  const user = await User.exists({ username: username });
  console.log(user, "user");
  if (!user) res.send({ error: "User does not exist" });

  if (user) {
    // Any object returned will be saved in `user` property of the JWT
    const data = await User.findById(user);
    console.log(data, "data");

    const isValid = await compare(password, data.password);
    console.log(isValid, "isValid");

    console.log(data, "data smdpfaosldfpasdofasofi");

    if (isValid) res.status(200).json({ success: true, data: data });
  }
}
