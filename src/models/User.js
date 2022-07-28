import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  backgroundColor: { type: String, default: "bg-slate-100" },
  tabColor: { type: String, default: "bg-slate-600" },
  textColor: { type: String, default: "text-white" },
});

const LinkSchema = new mongoose.Schema({
  url: { type: String },
  title: { type: String },
  image: { type: Buffer },
});

const ProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Example title",
  },
  bio: {
    type: String,
    default: "Example bio",
  },
  avatar: { type: Buffer },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email."],
    maxlength: [60, "Name cannot be more than 60 characters."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    maxlength: [60, "Name cannot be more than 60 characters."],
  },
  links: {
    _id: { type: mongoose.Schema.Types.ObjectId },
    type: Array,
    default: [],
  },
  profile: {
    type: ProfileSchema,
    default: {},
  },
  theme: {
    type: ThemeSchema,
    default: {},
  },
});

export { LinkSchema, ProfileSchema, UserSchema };

export default mongoose.models.User || mongoose.model("User", UserSchema);
