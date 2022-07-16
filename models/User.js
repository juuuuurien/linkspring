import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  backgroundColor: String,
  tabColor: String
});

const ProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [26, "Title cannot be more than 26 characters."]
  },
  bio: {
    type: String,
    maxlength: [220, "Bio cannot be more than 220 characters."]
  },
  theme: ThemeSchema
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    maxlength: [60, "Name cannot be more than 60 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email."],
    maxlength: [60, "Name cannot be more than 60 characters."]
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    maxlength: [60, "Name cannot be more than 60 characters."]
  },
  links: {
    type: Array,
    maxlength: [60, "Owner's Name cannot be more than 60 characters"]
  },
  profile: {
    type: ProfileSchema
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
