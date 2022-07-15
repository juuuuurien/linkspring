import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const { username, email, password } = req.body;
  const { db } = await connectToDatabase();

  console.log(req.body);

  const isUsername = await db
    .collection("users")
    .findOne({ username: username });

  const isEmail = await db.collection("users").findOne({ email: email });

  console.log(isUsername, isEmail);

  res.json("hello");
}
