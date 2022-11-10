import React, {  useContext, useEffect, useState } from "react";
import { WorkingTaskContext                             } from "../../config/contexts";

interface Props {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ setSidebarOpen }) => {
  const [ clock, setClock ] = useState<Date>(new Date());
  const { workingTask } = useContext(WorkingTaskContext);

  useEffect(() => {
    const tickInterval = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(tickInterval);
  }, []);

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4">
      <div className="flex items-center w-11/12 lg:w-full">
        <div className="relative mx-0 text-lg md:text-2xl font-light bg-yellow-300 rounded-full px-3 py-1 w-24 md:w-32 text-center">
          { clock?.format("hh:mm:ss") }
        </div>
        <div className="text-indigo-600 text-lg truncate px-2 flex-1">
          { workingTask ? workingTask.title : "No Working Task" }
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button
            className="text-gray-500 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>

          <div
            className="fixed inset-0 h-full w-full z-10"
            style={{ display: "none" }}
          ></div>

          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
            style={{ display: "none" }}
          ></div>
        </div>
      </div>

    </header>
  );
};

export default Header;