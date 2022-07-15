import Link from "next/link";
import React from "react";

const NavItem = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <li className="text-lg font-semibold">{title}</li>
      </a>
    </Link>
  );
};

const MainNavbar = () => {
  const navTitles = ["Links", "Appearance"];

  return (
    <section className="w-full py-6 px-5 bg-white">
      <nav>
        <ul className="flex flex-row gap-5">
          {navTitles.map((title) => (
            <NavItem
              title={title}
              href={
                title === "Links" ? "/dashboard" : `/${title.toLowerCase()}`
              }
            />
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default MainNavbar;
