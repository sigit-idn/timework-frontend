import React, { useState } from "react";
import { useLocation     } from "react-router-dom";

import Header  from "../components/panes/Header";
import Sidebar from "../components/panes/Sidebar";


const MainLayout: React.FC = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { pathname } = useLocation();
  if (/login/.test(pathname)) return <>{children}</>;

  return (
    <>
      <div>
        <div className="flex h-screen bg-gray-200">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header setSidebarOpen={setIsSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="container mx-auto px-6 py-2 md:py-7 max-w-5xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
