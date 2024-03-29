import {
  FileText,
  Home,
  LogOut,
  Users,
  Clock,
  UserPlus,
} from "@geist-ui/react-icons";
import React from "react";
import { useSelector } from "react-redux";

import { Auth } from "../../auth";
import SideLink from "./SideLink";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const role = useSelector((state: any) => state.auth.role);

  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      ></div>

      <div
        className={`fixed z-30 ease-out inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <svg
              className="h-12 w-12"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                fill="#4C51BF"
                stroke="#4C51BF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                fill="white"
              ></path>
            </svg>

            <span className="text-white text-2xl mx-2 font-semibold">
              Time Work
            </span>
          </div>
        </div>

        <nav className="mt-10">
          <SideLink
            to="/"
            icon={<Home />}
            title="Dashboard"
          />

          <SideLink
            to="/friends"
            icon={<Users />}
            title="Friends"
          />

          { /admin/.test(role) && (
            <SideLink
              to="/add-employee"
              icon={<UserPlus />}
              title="Add Employee"
            />
          ) }

          <SideLink
            to="/attendances"
            icon={<Clock />}
            title="Attendances"
          />

          <SideLink
            to="/reports"
            icon={<FileText />}
            title="Reports"
          />

          <span
            className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            onClick={Auth.logout}
          >
            <LogOut />
            <span className="mx-3 cursor-pointer">Logout</span>
          </span>
        </nav>
      </div>
    </>
  );
};
export default Sidebar;
