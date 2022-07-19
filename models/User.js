import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  backgroundColor: { type: String },
  tabColor: { type: String },
});

const LinkSchema = new mongoose.Schema({
  url: { type: String },
  title: { type: String },
});

const ProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "This is my title",
  },
  bio: {
    type: String,
    default: "This is my bio",
  },
  theme: {
    type: ThemeSchema,
    default: { backgroundColor: "#fafafa", tabColor: "#eeeeee" },
  },
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
    type: Array,
    default: [],
  },
  profile: {
    type: ProfileSchema,
    default: {},
  },
});

export { LinkSchema, ProfileSchema, UserSchema };

export default mongoose.models.User || mongoose.model("User", UserSchema);
