import { unstable_getServerSession } from "next-auth";
import User from "../../models/User";
import dbConnect from "../../util/mongoose";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { email: _email } = session.user;
  await dbConnect();

  const { type } = JSON.parse(req.body);

  console.log(JSON.parse(req.body));

  if (type === "get") {
    const user = await User.findOne({ email: _email });
    res.status(200).json(user.theme);
  }

  if (type === "update") {
    const updatedTheme = JSON.parse(req.body);
    const {
      backgroundColor,
      profileTextColor,
      tabColor,
      tabTextColor,
      tabLayout,
      headerLayout,
    } = updatedTheme;

    console.table({
      backgroundColor,
      profileTextColor,
      tabColor,
      tabTextColor,
      tabLayout,
      headerLayout,
    });

    const user = await User.findOneAndUpdate(
      {
        email: _email,
      },
      {
        $set: {
          "theme.backgroundColor": backgroundColor,
          "theme.profileTextColor": profileTextColor,
          "theme.tabColor": tabColor,
          "theme.tabTextColor": tabTextColor,
          "theme.tabLayout": tabLayout,
          "theme.headerLayout": headerLayout,
        },
        new: true,
        upsert: true,
      }
    );
    console.log(user.theme);

    res.status(200).json({ theme: user.theme });
  }
}
