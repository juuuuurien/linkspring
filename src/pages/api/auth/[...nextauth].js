import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../util/mongodb";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials;
        const stringifiedBody = JSON.stringify({
          // did it this way because body wasn't being stringified in the fetch call
          username: username,
          password: password,
        });
        // make db call here
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          body: stringifiedBody,
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.exception);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user.data;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "credentials" && user) {
        return true;
      }

      if (account.provider === "google") {
        // check if user exists in db, if not, create one.
        const res = await (
          await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
            }),
          })
        ).json();

        // if not, create one here
        if (res.status === 404 && res.error) {
          await (
            await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
              method: "POST",
              body: JSON.stringify({
                email: user.email,
                username: user.email.slice(0, -10),
                password: user.id,
              }),
            })
          ).json();
        }

        return true;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
