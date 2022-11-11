import React from "react";
import { useNavigate } from "react-router-dom";
import { Home        } from "@geist-ui/react-icons";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-20">
      <h1 className=" text-6xl font-extralight text-gray-700">404</h1>
      <h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
      <button
        className="mt-5 px-5 py-2 rounded-lg shadow-md bg-indigo-500 text-white hover:bg-indigo-600 flex"
        onClick={() => navigate("/")}
      >
        <Home className="mr-2" /> Go Home
      </button>
    </div>
  );
}

export default NotFound;