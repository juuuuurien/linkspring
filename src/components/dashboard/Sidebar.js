import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "../../../public/assets/linkspring_logo.svg";

const Sidebar = () => {
  return (
    <section className="flex flex-col justify-between items-center py-5 h-full w-[100px] bg-white border border-gray-200 z-10">
      <Link href="/">
        <a>
          <Image src={Logo} height={48} width={48} className="p-0" />
        </a>
      </Link>

      <Link href="/dashboard">
        <a>
          <div className="flex justify-center items-center rounded-[100%] h-[48px] w-[48px] bg-gray-600">
            <h1>JL</h1>
          </div>
        </a>
      </Link>
    </section>
  );
};

export default Sidebar;
