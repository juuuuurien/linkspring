import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth";
import User, { LinkSchema } from "../../../models/User";
import dbConnect from "../../../util/mongoose";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(session, "this is session asdjlfasd;fhasdklfjasdhl");

  const { email: _email } = session.user;
  await dbConnect();

  const { type } = JSON.parse(req.body);

  if (type === "get" && session) {
    const user = await User.findOne({ email: _email });
    res.status(200).json({ links: user.links });
  }

  if (type === "add") {
    const emptyLink = {
      _id: mongoose.Types.ObjectId(),
      url: "",
      title: "",
      image: "",
    };

    const user = await User.findOneAndUpdate(
      { username: username },
      { $push: { links: { ...emptyLink } } },
      { new: true }
    );

    res.status(200).json({ links: user.links });
  }

  if (type === "delete") {
    const { _id } = JSON.parse(req.body);

    const user = await User.findOneAndUpdate(
      { username: username },
      {
        $pull: {
          links: { _id: mongoose.Types.ObjectId(_id) },
        },
      }
    );

    res.status(200).json({ links: user.links });
  }

  if (type === "update") {
    const { _id, formData } = JSON.parse(req.body);

    //  const user = await User.findOneAndUpdate({
    //   {username: username, links: {$elemMatch: {_id: mongoose.Types.ObjectId(_id)}},
    //   {$set: {'links.$.url': url, 'links.$.title': title}, new: true}}})

    const { url, title } = formData;

    const user = await User.findOneAndUpdate(
      {
        username: username,
        "links._id": mongoose.Types.ObjectId(_id),
      },
      { $set: { "links.$.url": url, "links.$.title": title }, new: true }
    );

    res.status(200).json({ links: user.links });
  }
}
