import mongoose from "mongoose";
import User, { LinkSchema } from "../../../models/User";
import dbConnect from "../../../util/mongoose";

import s3 from "../../../../s3";

export default async function handler(req, res) {
  await dbConnect();

  const { username, type } = JSON.parse(req.body);

  if (type === "get") {
    const user = await User.findOne({ username: username });
    res.status(200).json(user.profile);
  }

  //   if (type === "add") {
  //     const emptyLink = {
  //       _id: mongoose.Types.ObjectId(),
  //       url: "",
  //       title: "",
  //     };

  //     const user = await User.findOneAndUpdate(
  //       { username: username },
  //       { $push: { links: { ...emptyLink } } },
  //       { new: true }
  //     );

  //     res.status(200).json({ links: user.links });
  //   }

  //   if (type === "delete") {
  //     const { _id } = JSON.parse(req.body);

  //     console.log(_id);

  //     const user = await User.findOneAndUpdate(
  //       { username: username },
  //       {
  //         $pull: {
  //           links: { _id: mongoose.Types.ObjectId(_id) },
  //         },
  //       }
  //     );

  //     console.log(user.links);

  //     res.status(200).json({ links: user.links });
  //   }

  if (type === "update") {
    const { username, updatedProfile } = JSON.parse(req.body);
    const { title, bio, avatar } = updatedProfile;
    const user = await User.findOneAndUpdate(
      {
        username: username,
      },
      {
        $set: {
          "profile.title": title,
          "profile.bio": bio,
          "profile.avatar": avatar,
        },
        new: true,
      }
    );

    res.status(200).json({ profile: user.profile });
  }

  //   if (type === "update_avatar") {
  //     const user = await User.findOneAndUpdate(
  //       {
  //         username: username,
  //       },
  //       {
  //         $set: {
  //           "profile.title": title,
  //           "profile.bio": bio,
  //           "profile.avatar": avatar,
  //         },
  //         new: true,
  //       }
  //     );

  //     res.status(200).json({ profile: user.profile });
  //   }
}
