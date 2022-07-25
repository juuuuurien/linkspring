import { TextInput, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";

const Signup = () => {
  const url = `${process.env.NEXT_PUBLIC_URL}/dashboard`;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (val) => {
    setUsername(val.split(" ").join(""));
  };

  const handleEmailChange = (val) => {
    setEmail(val);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
  };

  const handleSignup = async ({ username, email, password }) => {
    const data = await (
      await fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      })
    ).json();
    if (data.error) throw new Error(data.error);

    return data;
  };

  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    handleSignup,
    {
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <section className="flex flex-col  h-screen w-screen bg-slate-100">
      <div className="p-20">
        <h1>
          <Link href="/">Linkspring</Link>
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
            <span className={`text-gray-500`}>linkspring.me/</span>
            <input
              autofill={true}
              required
              name="username"
              onFocus={() => {
                if (!usernameFocus) setUsernameFocus(true);
              }}
              onBlur={() => {
                setUsername(username.toLowerCase());
                if (usernameFocus) setUsernameFocus(false);
              }}
              onChange={(e) => handleUsernameChange(e.target.value)}
              value={username}
              className={
                "bg-transparent focus:ring-0 focus:outline-none py-3 text-sm ml-1 w-[80%] h-full"
              }
              placeholder="Username"
            />
          </div>
          <TextInput
            autofill={true}
            name="email"
            type="email"
            placeholder="Email"
            required={true}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <TextInput
            autofill={true}
            name="password"
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
          <span className="text-gray-500">
            {isSuccess ? `Account created!` : null}
          </span>
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
