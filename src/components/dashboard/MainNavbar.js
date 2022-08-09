import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavItem = ({ title, href, selected }) => {
  return (
    <Link href={href}>
      <a
        className={` flex flex-col items-center ${
          selected
            ? "after:h-[2px] after:rounded-[1000px] after:w-[80%] after:bg-slate-600"
            : null
        }`}
      >
        <li
          className={`flex flex-col my-2 text-lg font-semibold hover:bg-slate-100 rounded-lg py-3 px-4`}
        >
          {title}
        </li>
      </a>
    </Link>
  );
};

const MainNavbar = () => {
  const navTitles = ["Links", "Style"];

  const router = useRouter();

  return (
    <section className=" flex self-start px-5 w-full bg-white">
      <nav>
        <ul className="flex flex-row gap-5">
          {navTitles.map((title) => (
            <NavItem
              key={title}
              selected={
                router.pathname === `/dashboard/${title.toLowerCase()}` ||
                (router.pathname === "/dashboard" && title === "Links")
              }
              title={title}
              href={
                title === "Links"
                  ? "/dashboard"
                  : `dashboard/${title.toLowerCase()}`
              }
            />
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default MainNavbar;
