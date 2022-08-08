import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Brand from "../../public/assets/linkspring_brand.svg";

export default function Home() {
  const { data, status } = useSession();

  console.log(status);

  return (
    <div>
      <Head>
        <title>Linkspring</title>
        <meta name="description" content="Your link resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-full w-full ">
        {/* navbar */}
        <div className="flex flex-row px-5  justify-between items-center w-full bg-gray-100 p-2">
          <div className="flex flex-row items-center gap-10 ">
            <button className="mx-5 lg:w-[200px] w-[100px]">
              <Link href="/dashboard">
                <Image
                  src={Brand}
                  height={36}
                  width={164}
                  layout="responsive"
                  alt="Logo"
                />
              </Link>
            </button>
            {/* <h1 className="text-gray-400 font-semibold text-lg whitespace-nowrap lg:text-2xl hidden sm:block">
              Create, learn, share.
            </h1> */}
          </div>
          {!(status === "loading") && !data && (
            <div className="flex flex-row gap-3">
              <Link href="/login">
                <a>
                  <div className="md:py-4 md:px-6 py-2 px-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold cursor-pointer">
                    Log in
                  </div>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <div className="md:py-4 md:px-6 py-2 px-2 bg-gray-900 hover:bg-gray-600 rounded-[10000px] text-white font-semibold flex-nowrap">
                    Sign Up
                  </div>
                </a>
              </Link>
            </div>
          )}
          {!(status === "loading") && data && (
            <div className="flex flex-row gap-3">
              <div
                onClick={() =>
                  signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL })
                }
                className="md:py-4 md:px-6 py-2 px-2 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer"
              >
                Sign Out
              </div>
              <Link href="/dashboard">
                <a>
                  <div className="md:py-4 md:px-6 py-2 px-2 bg-gray-900 hover:bg-gray-600 rounded-[10000px] text-white font-semibold flex-nowrap">
                    Dashboard
                  </div>
                </a>
              </Link>
            </div>
          )}
        </div>
        {/* Hero Page */}
        {/* <div className="flex flex-col h-full w-full text-center justify-center md:justify-start md:text-left pt-[10vh] sm:pt-[14vh] md:pt-[18vh] px-[15vw] ">
          <section className="flex flex-col gap-5 lg:max-w-[50%]">
            <p className="xl:jumbo-text font-bold text-5xl md:text-6xl lg:text-8xl text-yellow-400">
              Everything you are. All in one simple link.
            </p>
            <p className="text-yellow-400 text-left font-semibold text-xl md:max-w-[80%]">
              Join 25M+ people and share everything you create, curate and sell
              online. All from the one link in your bio.
            </p>
          </section>
        </div> */}
        <section className="relative h-fit max-h-[720px] w-full bg-slate-400 overflow-hidden shadow-xl">
          <div className="absolute flex justify-start items-center h-full w-full bg-[#dde8f3cc]">
            <div className="md:hero-slanted-container flex justify-start items-center h-full w-full md:bg-slate-200">
              <div className="flex flex-col gap-5 lg:max-w-[36%] mx-[10%] ">
                <p className="xl:jumbo-text font-bold text-5xl md:text-6xl lg:text-8xl text-gray-800">
                  All of who you are in{" "}
                  <span className="text-[#3395FF]">one simple link.</span>
                </p>
                <p className="text-slate-800 text-left font-semibold text-xl md:max-w-[80%]">
                  Join linkspring to start networking with all kinds of people,
                  all with a simple link in your bio.
                </p>
              </div>
            </div>
          </div>
          <video autoPlay loop className="object-cover height-[200%]">
            <source
              src={
                "https://res.cloudinary.com/linkspring-me/video/upload/v1659810286/hero_background_video_jjqlvu.mp4"
              }
              type="video/mp4"
            />
          </video>
        </section>
        <section className="h-96 w-full flex justify-center items-center ">
          <div className="flex flex-row justify-between items-center w-full max-w-[80%] md:max-w-[45%] h-full p-10">
            <h1 className="text-4xl text-slate-900">Easy, simple, and free.</h1>
            <Link href="/signup">
              <a className="px-10 py-6 bg-gray-900 text-white rounded-[10000px] text-xl font-semibold">
                Get Started
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
