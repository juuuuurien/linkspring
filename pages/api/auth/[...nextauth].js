import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../util/mongodb";
import dbConnect from "../../../util/mongoose";

import User from "../../../models/User";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        // console.log(credentials, "=====");
        // console.log(req, "+++++");
        const { username, password } = credentials;

        console.log(credentials, "=-0=-0=-0");
        // make db call here
        await dbConnect();

        const user = await User.exists({ username: username });
        console.log("User: ", user);
        if (!user)
          throw new Error("There exists no profile with this username!");

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const data = await User.findById(user);

          console.log("Data", data);

          return data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials, authorize }) {
  //     console.log(user, "this is user returned from authorize");
  //     if (user !== null) return "/dashboard";
  //     return "/login";
  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
});
