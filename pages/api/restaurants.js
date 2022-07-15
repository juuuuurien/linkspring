import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection("restaurants").find({}).limit(5).toArray();

  res.json(data);
}
