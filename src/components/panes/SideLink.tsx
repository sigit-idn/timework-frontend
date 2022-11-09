import React from "react";
import { Link } from "react-router-dom";

interface SideLinkProps {
  to: string;
  icon: React.ReactNode;
  title: string;
}

const SideLink: React.FC<SideLinkProps> = ({ to, icon, title }) => {
  return (
    <Link
      className={`flex items-center mt-4 py-2 px-6 hover:bg-gray-800 ${
        window.location.pathname.match(
          new RegExp(
            title.replace("Dashboard", "/").replace(/\s/, "-") + "$",
            "ig"
          )
        )
          ? "bg-gray-700 bg-opacity-25 text-gray-100"
          : "text-gray-500 hover:text-gray-100"
      }`}
      to={to}
    >
      {icon}
      <span className="mx-3">{title}</span>
    </Link>
  );
};

export default SideLink;
