import Link from "next/link";
import React from "react";

const NavItem = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <li className="text-lg font-semibold hover:bg-slate-200 rounded-lg py-1 px-2">
          {title}
        </li>
      </a>
    </Link>
  );
};

const MainNavbar = () => {
  const navTitles = ["Links", "Appearance"];

  return (
    <section className=" flex self-start py-3 px-5 w-full bg-white">
      <nav>
        <ul className="flex flex-row gap-5">
          {navTitles.map((title) => (
            <NavItem
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
