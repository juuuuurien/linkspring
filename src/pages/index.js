import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Brand from "../../public/assets/linkspring_brand.svg";

export default function Home() {
  const { data, status } = useSession();
  return (
    <div>
      <Head>
        <title>Linkspring</title>
        <meta name="description" content="Your link resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" flex flex-col h-screen w-screen py-20  bg-green-900">
        {/* navbar */}
        <div className="fixed flex flex-row justify-between items-center self-center lg:gap-20 p-2 lg:p-[12px] w-[90%] xl:w-[66%] rounded-[10000px] bg-gray-200">
          <div className="flex flex-row items-center gap-10 ">
            <button className=" mx-5 lg:w-[200px] w-[100px]">
              <Link href="/dashboard">
                <Image
                  src={Brand}
                  height={80}
                  width={200}
                  layout="responsive"
                />
              </Link>
            </button>
            <h1 className="text-gray-400 font-semibold text-lg whitespace-nowrap lg:text-2xl hidden sm:block">
              Create, learn, share.
            </h1>
          </div>
          <div className="flex flex-row gap-3">
            {!data && (
              <Link href="/login">
                <a>
                  <div className="lg:py-4 lg:px-6 py-2 px-2  w-full bg-gray-300 rounded-lg font-semibold flex-nowrap">
                    Log in
                  </div>
                </a>
              </Link>
            )}
            {data && (
              <div
                onClick={() =>
                  signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL })
                }
                className="md:py-4 md:px-6 py-2 px-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold cursor-pointer"
              >
                Sign Out
              </div>
            )}
            <Link href="/signup">
              <a>
                <div className="md:py-4 md:px-6 py-2 px-2 bg-gray-900 hover:bg-gray-800 rounded-[10000px] text-white font-semibold flex-nowrap">
                  Sign Up
                </div>
              </a>
            </Link>
          </div>
        </div>
        {/* Hero Page */}
        <div className="flex flex-col h-full w-full text-center justify-center md:justify-start md:text-left pt-[10vh] sm:pt-[14vh] md:pt-[18vh] px-[15vw] ">
          <section className="flex flex-col gap-5 lg:max-w-[50%]">
            <p className="xl:jumbo-text font-bold text-5xl md:text-6xl lg:text-8xl text-yellow-400">
              Everything you are. All in one simple link.
            </p>
            <p className="text-yellow-400 text-left font-semibold text-xl md:max-w-[80%]">
              Join 25M+ people and share everything you create, curate and sell
              online. All from the one link in your bio.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
