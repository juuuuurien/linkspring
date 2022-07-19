import User, { LinkSchema } from "../../../models/User";
import dbConnect from "../../../util/mongoose";

export default async function handler(req, res) {
  await dbConnect();

  const { username, type } = JSON.parse(req.body);

  if (type === "get") {
    User.findOne({ username: username }, (err, user) => {
      if (err) res.status(500).send({ error: err });
      res.status(200).json({ links: user.links });
    });
  }

  if (type === "add") {
    const emptyLink = {
      url: "",
      title: "",
    };

    User.findOneAndUpdate(
      { username: username },
      { $push: { links: { ...emptyLink } } },
      { new: true },
      (err, user) => {
        if (err) res.status(500).send({ error: err });
        res.status(200).json({ links: user.links });
      }
    );
  }
}
