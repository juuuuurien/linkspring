import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { data, status } = useSession();
  return (
    <div>
      <Head>
        <title>Treeoflinks</title>
        <meta name="description" content="Your link resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" flex flex-col h-screen w-screen py-20  bg-green-900">
        {/* navbar */}
        <div className="fixed flex flex-row justify-between items-center self-center gap-20 p-[12px] mx-[20rem] rounded-[10000px] bg-gray-200">
          <div className="flex flex-row items-center  gap-10 pl-6">
            <h1>Logo</h1>
            <h1 className="text-gray-400 font-semibold text-2xl">
              Create, learn, share.
            </h1>
          </div>
          <div className="flex flex-row gap-3">
            {!data && (
              <Link href="/login">
                <a>
                  <div className="py-4 px-6 bg-gray-300 rounded-lg font-semibold">
                    Log in
                  </div>
                </a>
              </Link>
            )}
            {data && (
              <div
                onClick={() =>
                  signOut({ callbackUrl: "https://5mjnky.sse.codesandbox.io/" })
                }
                className="py-4 px-6 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold cursor-pointer"
              >
                Sign Out
              </div>
            )}
            <Link href="/signup">
              <a>
                <div className="py-4 px-6 bg-gray-900 rounded-[10000px] text-white font-semibold">
                  Sign Up
                </div>
              </a>
            </Link>
          </div>
        </div>
        {/* Hero Page */}
        <div className="flex flex-col h-full w-full pt-[23vh] px-[15vw] ">
          <section className="flex flex-col gap-5 max-w-[50%]">
            <p className="jumbo-text text-yellow-400">
              Everything you are. All in one simple link.
            </p>
            <p className="text-yellow-400 font-semibold text-xl max-w-[80%]">
              Join 25M+ people and share everything you create, curate and sell
              online. All from the one link in your bio.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
