import { useRouter } from "next/router";
import User from "../models/User";
import dbConnect from "../util/mongoose";

const Profile = ({ userdata }) => {
  const { username, links, profile } = userdata;
  return (
    <>
      {links.map((e) => (
        <div>{e.title}</div>
      ))}
    </>
  );
};

export async function getServerSideProps(context) {
  dbConnect();
  console.log(context.query);

  const _username = context.query.slug;

  console.log(context);

  const user = await User.findOne({ username: _username });
  const { username, links, profile } = user;

  return {
    props: {
      userdata: JSON.parse(JSON.stringify({ username, links, profile }))
    }
  };
}

export default Profile;
