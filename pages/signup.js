import { TextInput, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";

const Signup = () => {
  const [username, setUsername] = useState("asdf");
  const [email, setEmail] = useState("asdf@GMAIL.COM");
  const [password, setPassword] = useState("ASDF");
  const [usernameFocus, setUsernameFocus] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (val) => {
    setUsername(val);
  };

  const handleEmailChange = (val) => {
    setEmail(val);
  };

  const handlePasswordChange = (val) => {
    setEmail(val);
  };

  const handleSignup = async ({ username, email, password }) => {
    console.log(JSON.stringify({ username, email, password }));
    const data = await (
      await fetch("https://pzet0c.sse.codesandbox.io/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password })
      })
    ).json();

    console.log(data);

    if (data.error) throw new Error(data.error);

    return data;
  };

  const { mutate, isLoading, isError, error } = useMutation(handleSignup, {
    onSuccess: () => {
      console.log("suck sess");
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <section className="flex flex-col  h-screen w-screen bg-slate-100">
      <div className="p-20">
        <h1>
          <Link href="/">TreeOfLinks</Link>
        </h1>
      </div>
      <div className="flex flex-col gap-5 mx-auto w-full max-w-[800px]">
        <h1 className="text-5xl font-extrabold">Create an account for free</h1>
        <h2 className="font-normal text-gray-500">
          Free forever. No payment needed.
        </h2>
        <div className="flex flex-col gap-4 my-5">
          <div
            className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 px-2.5 bg-gray-50 text-gray-900 rounded-lg text-sm ${
              usernameFocus
                ? "border-blue-500 ring-blue-500 ring-1"
                : " border-gray-300 "
            }`}
          >
            <span className={`text-gray-500`}>treeoflinks.me/</span>
            <input
              required
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
            />
          </div>
          <TextInput
            type="email"
            placeholder="Email"
            required={true}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <TextInput
            type="password"
            placeholder="Password"
            required={true}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <button
            onClick={() => {
              mutate({ username, email, password });
            }}
            disabled={
              username.length < 1 || email.length < 1 || password.length < 1
            }
            className="bg-purple-600 text-white rounded-[10000px] p-3"
          >
            {isLoading ? <Spinner /> : "Sign Up With Email"}
          </button>
          <span className="text-red-700">{isError ? `${error}` : null}</span>
        </div>
        <p>
          {" Already have an account? "}
          <span className="underline">
            <Link href="/login">Log in</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;
