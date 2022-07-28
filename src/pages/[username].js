import Profile from "../components/profile/Profile";
import User from "../models/User";
import dbConnect from "../util/mongoose";

const ProfilePage = ({ userdata }) => {
  if (!userdata)
    return (
      <div>
        The page you’re looking for doesn’t exist. Want this to be your
        username? Create your Linkspring now.
      </div>
    );

  return (
    <div className="w-screen h-screen">
      <Profile userdata={userdata} />
    </div>
  );
};

export async function getServerSideProps(context) {
  dbConnect();
  const _username = context.query.username;
  const user = await User.findOne({ username: _username });

  let data;
  if (user) {
    const { username, links, profile, theme } = user;
    data = { username, links, profile, theme };
  }
  if (!user) data = null;

  return {
    props: {
      userdata: JSON.parse(JSON.stringify(data)),
    },
  };
}

export default ProfilePage;
