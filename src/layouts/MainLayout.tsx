import { FunctionComponent, useState } from "react";
import { useLocation                 } from "react-router-dom";

import Sidebar from "../components/Sidebar/";
import Header  from "../components/Header";

const MainLayout: FunctionComponent = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();
  if (/login/.test(pathname)) return <>{children}</>;

  return (
    <>
      <div>
        <div className="flex h-screen bg-gray-200">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header setSidebarOpen={setSidebarOpen} />
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
