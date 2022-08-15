import { TextInput, Spinner } from "flowbite-react";
import Image from "next/image";
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

  const fetchSignup = async ({ username, email, password }) => {
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
    fetchSignup,
    {
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleRegister = (e) => {
    e.preventDefault();
    mutate({ username, email, password });
  };

  return (
    <section className="flex flex-col h-screen w-screen p-6 gap-20 bg-slate-100">
      <div className="flex justify-center items-center md:block p-4">
        <button className="flex justify-center items-center md:mx-5  lg:w-[180px] max-w-[180px]">
          <Link href="/dashboard">
            <Image
              src={"/assets/linkspring_brand.svg"}
              height={220}
              width={666}
              alt="Logo"
            />
          </Link>
        </button>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center mx-auto w-full max-w-[640px] min-w-[30%] pb-10">
        <h1 className="text-5xl font-extrabold">Create an account for free</h1>
        <h2 className="font-normal text-gray-500">
          Free forever. No payment needed.
        </h2>
        <form className="flex flex-col gap-4 my-5 w-full">
          <div
            className={`flex flex-row items-center whitespace-nowrap w-full border disabled:cursor-not-allowed disabled:opacity-50 pl-2.5 bg-gray-50 text-gray-900 rounded-lg text-sm ${
              usernameFocus
                ? "border-blue-500 ring-blue-500 ring-1"
                : " border-gray-300 "
            }`}
          >
            <div className={`text-gray-500`}>linkspring.me/</div>
            <input
              autofill={"true"}
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
            autofill={"true"}
            name="email"
            type="email"
            placeholder="Email"
            required={true}
            onChange={(e) => handleEmailChange(e.target.value)}
            value={email}
          />
          <TextInput
            autofill={"true"}
            name="password"
            type="password"
            placeholder="Password"
            required={true}
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            onClick={handleRegister}
            disabled={
              username.length < 1 || email.length < 1 || password.length < 1
            }
            className="bg-[#3395FF] text-white rounded-[10000px] p-3 disabled:bg-slate-200 disabled:text-slate-400"
          >
            {isLoading ? <Spinner /> : "Sign Up With Email"}
          </button>
          <span className="text-red-700">{isError ? `${error}` : null}</span>
          <span className="text-gray-500">
            {isSuccess ? `Account created!` : null}
          </span>
        </form>
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
