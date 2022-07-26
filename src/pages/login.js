import { TextInput, Spinner } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const Login = () => {
  const url = `${process.env.NEXT_PUBLIC_URL}/dashboard`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (val) => {
    setUsername(val);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // returns a promise since redirect is custom handled
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: url,
    });

    if (res.error) {
      setLoading(false);
      setError(res.error);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <section className="flex flex-col h-screen w-screen bg-slate-100">
      <div className="p-20">
        <h1>
          <Link href="/">Linkspring</Link>
        </h1>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center mx-auto w-full max-w-[640px] min-w-[30%]">
        <h1 className="text-5xl font-extrabold">Log in to your Linkspring</h1>
        <form className="flex flex-col gap-4 my-5 w-full">
          <div
            className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 px-2.5 bg-gray-50 text-gray-900 rounded-lg text-sm ${
              usernameFocus
                ? "border-blue-500 ring-blue-500 ring-1"
                : " border-gray-300 "
            }`}
          >
            <span className={`text-gray-500`}>linkspring.me/</span>

            <input
              autofill={true}
              required
              name="username"
              onFocus={() => {
                if (!usernameFocus) setUsernameFocus(true);
              }}
              onBlur={() => {
                if (usernameFocus) setUsernameFocus(false);
              }}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className={
                "bg-transparent focus:ring-0 focus:outline-none py-3 text-sm ml-1 w-[80%] h-full"
              }
              placeholder="Username"
            ></input>
          </div>
          <TextInput
            autofill={true}
            name="password"
            type="password"
            placeholder="Password"
            required={true}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />

          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-[10000px] p-3"
            onClick={handleLogin}
          >
            {loading ? <Spinner /> : "Log In"}
          </button>
        </form>
        <span className="text-red-700">{error ? `${error}` : null}</span>
        <section className="flex flex-col justify-center items-center gap-10">
          <p className="underline">
            <Link href="/">Forgot your password?</Link>
          </p>
          <p>
            {" Don't have a Linktree account? "}
            <span className="underline">
              <Link href="/signup">Create one</Link>
            </span>
          </p>
        </section>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}

export default Login;
