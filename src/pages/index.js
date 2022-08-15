import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data, status } = useSession();

  return (
    <>
      <Head>
        <title>Linkspring</title>
        <meta name="description" content="Your brief summary of who you are." />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="flex flex-col h-full w-full ">
        {/* navbar */}
        <div className="fixed flex flex-row px-5 justify-between items-center w-full bg-gray-100 p-2 z-10">
          <button className="button flex justify-center items-center mr-5 md:mx-5  lg:w-[140px] max-w-[140px]">
            <Link href="/dashboard">
              <Image
                src={"/assets/linkspring_brand.svg"}
                height={220}
                width={666}
                alt="Logo"
              />
            </Link>
          </button>
          {/* <h1 className="text-gray-400 font-semibold text-lg whitespace-nowrap lg:text-2xl hidden sm:block">
              Create, learn, share.
            </h1> */}
          {!(status === "loading") && !data && (
            <div className="flex flex-row gap-3">
              <Link href="/login">
                <a>
                  <button className="button md:py-4 md:px-6 py-2 px-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold cursor-pointer">
                    Log in
                  </button>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <button className="button md:py-4 md:px-6 py-2 px-2 bg-gray-900 hover:bg-gray-600 rounded-[10000px] text-white font-semibold flex-nowrap">
                    Sign Up
                  </button>
                </a>
              </Link>
            </div>
          )}
          {!(status === "loading") && data && (
            <div className="flex flex-row gap-3">
              <Link href="/dashboard">
                <a>
                  <div className="md:py-4 md:px-6 py-2 px-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold cursor-pointer">
                    Dashboard
                  </div>
                </a>
              </Link>
              <button
                onClick={() =>
                  signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL })
                }
                className="button md:py-4 md:px-6 py-2 px-2 bg-gray-900 hover:bg-gray-600 rounded-[10000px] text-white font-semibold flex-nowrap"
              >
                Sign Out
              </button>
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
        <section className="relative h-screen min-h-[480px] w-full bg-slate-400 overflow-hidden shadow-xl">
          <video
            autoPlay
            loop
            width="100%"
            height={"100%"}
            className="absolute object-cover h-full"
          >
            <source
              src={
                "https://res.cloudinary.com/linkspring-me/video/upload/v1659810286/hero_background_video_jjqlvu.mp4"
              }
              type="video/mp4"
            />
          </video>
          <div className="absolute flex justify-start items-center h-full w-full bg-[#dde8f3cc]">
            <div className="md:hero-slanted-container flex justify-start items-center h-full w-full md:bg-slate-200">
              <div className="flex flex-col gap-5 md:max-w-[36%] mx-[10%] ">
                <p className="xl:jumbo-text font-bold text-5xl md:text-5xl lg:6xl text-gray-800">
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
        </section>
        <section className="h-96 w-full flex justify-center items-center ">
          <div className="flex flex-col md:flex-row justify-center text-center md:text-left gap-6 md:justify-between items-center w-full max-w-[80%] md:max-w-[45%] h-full p-10">
            <h1 className="whitespace-nowrap text-3xl md:text-4xl text-slate-900">
              Easy, simple, and free.
            </h1>
            <Link href="/signup">
              <a className="px-6 py-3 md:px-10 md:py-6 whitespace-nowrap bg-gray-900 text-white rounded-[10000px] text-lg md:text-xl font-semibold">
                Get Started
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
