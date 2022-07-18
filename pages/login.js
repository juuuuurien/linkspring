import { TextInput, Spinner } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);

  const { status } = useSession();

  console.log(status, "this is status");

  const handleUsernameChange = (val) => {
    setUsername(val);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
  };

  return (
    <section className="flex flex-col h-screen w-screen bg-slate-100">
      <div className="p-20">
        <h1>
          <Link href="/">TreeOfLinks</Link>
        </h1>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center mx-auto w-full max-w-[640px] min-w-[30%]">
        <h1 className="text-5xl font-extrabold">Log in to your TreeofLinks</h1>
        <div className="flex flex-col gap-4 my-5 w-full">
          <div
            className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 px-2.5 bg-gray-50 text-gray-900 rounded-lg text-sm ${
              usernameFocus
                ? "border-blue-500 ring-blue-500 ring-1"
                : " border-gray-300 "
            }`}
          >
            <span className={`text-gray-500`}>treeoflinks.me/</span>
            <input
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
            className="bg-purple-600 text-white rounded-[10000px] p-3"
            onClick={() =>
              signIn("credentials", {
                username,
                password,
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
          >
            {status === "loading" ? <Spinner /> : "Log In"}
          </button>
        </div>
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

const getServerSideProps = async (ctx) => {
  return {
    props: {
      providers: await providers(ctx),
    },
  };
};

export default Login;
