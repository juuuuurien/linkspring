import mongoose from "mongoose";
import User, { LinkSchema } from "../../../models/User";
import dbConnect from "../../../util/mongoose";

export default async function handler(req, res) {
  await dbConnect();

  const { username, type } = JSON.parse(req.body);

  if (type === "get") {
    const user = await User.findOne({ username: username });
    res.status(200).json({ links: user.links });
  }

  if (type === "add") {
    const emptyLink = {
      _id: mongoose.Types.ObjectId(),
      url: "",
      title: "",
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

    console.log(_id);

    const user = await User.findOneAndUpdate(
      { username: username },
      {
        $pull: {
          links: { _id: mongoose.Types.ObjectId(_id) },
        },
      }
    );

    console.log(user.links);

    res.status(200).json({ links: user.links });
  }

  if (type === "update") {
    const { _id } = JSON.parse(req.body);

    //  const user = await User.findOneAndUpdate({
    //   {username: username, links: {$elemMatch: {_id: mongoose.Types.ObjectId(_id)}},
    //   {$set: {'links.$.url': url, 'links.$.title': title}, new: true}}})

    const title = "Portfolio";
    const url = "www.julienlopez.me";

    const user = await User.findOneAndUpdate(
      {
        username: username,
        "links._id": mongoose.Types.ObjectId(_id),
      },
      { $set: { "links.$.url": url, "links.$.title": title }, new: true }
    );

    console.log(user);

    res.status(200).json({ links: user.links });
  }
}
