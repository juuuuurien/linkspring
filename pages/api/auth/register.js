import User from "../../../models/User";
import dbConnect from "../../../util/mongoose";

import { createHash } from "../../../util/bcrypt";

export default async function handler(req, res) {
  const { username, email, password } = JSON.parse(req.body);

  await dbConnect();

  const usernameExists = await User.exists({ username: username });
  const emailExists = await User.exists({ email: email });

  if (!email || !username || !password) {
    res.status(500).send({ error: "Please enter all fields" });
  }

  if (emailExists || usernameExists) {
    res
      .status(500)
      .send({ error: "There exists a user with this email or username" });
  } else {
    // create if no existing user
    const hash = await createHash(password);
    User.create({ username, email, password: hash });
    res.status(201).json({ success: true });
  }
}
