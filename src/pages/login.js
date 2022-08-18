import { TextInput, Spinner } from "flowbite-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";

const Login = ({ session }) => {
  const url = `${process.env.NEXT_PUBLIC_URL}/dashboard`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(session);

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

    if (res.status === 401) {
      setLoading(false);
      setError("Invalid username or password");
      return;
    }

    router.push("/dashboard");
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await signIn("google");

    router.push("/dashboard");
  };

  return (
    <section className="flex flex-col h-screen w-screen p-6 bg-slate-100">
      <div className="flex justify-center items-center md:block md:p-4">
        <button className="flex justify-center items-center md:mx-5  lg:w-[180px] max-w-[180px]">
          <Link href="/">
            <Image
              src={"/assets/linkspring_brand.svg"}
              height={220}
              width={666}
              alt="Logo"
            />
          </Link>
        </button>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center mx-auto w-full h-full max-w-[640px] min-w-[30%] pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Log in to your Linkspring
        </h1>
        <form
          className="flex flex-col gap-4 my-5 w-full"
          autoComplete="on"
          onSubmit={handleLogin}
        >
          <div
            className={`flex flex-row items-center whitespace-nowrap w-full border disabled:cursor-not-allowed disabled:opacity-50 pl-2.5 bg-gray-50 text-gray-900 rounded-lg text-sm ${
              usernameFocus
                ? "border-blue-500 ring-blue-500 ring-1"
                : " border-gray-300 "
            }`}
          >
            <div className={`text-gray-500`}>linkspring.me/</div>

            <input
              autoComplete={"on"}
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
                "bg-transparent focus:ring-0 focus:outline-none py-3 text-sm ml-1 w-full h-full"
              }
              placeholder="Username"
            ></input>
          </div>
          <TextInput
            autoComplete={"on"}
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
            className="button hover:bg-[#56a8ff] bg-[#3395FF] text-white font-semibold rounded-[10000px] p-3"
          >
            {loading ? <Spinner /> : "Log in"}
          </button>
          <button
            className="button relative flex items-center font-semibold justify-center bg-white hover:bg-gray-100 text-gray-900 rounded-[10000px] p-3"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="absolute left-6 self-start h-6 w-6" />
            {loading ? <Spinner /> : "Log in with Google"}
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
