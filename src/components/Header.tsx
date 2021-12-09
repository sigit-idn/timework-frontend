import { Bell } from "@geist-ui/react-icons";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { TaskContext } from "../config/contexts";
import useAuthFetch from "../utils/authFetchHook";

interface Props {
  setSidebarOpen: Function;
}

const Header: FunctionComponent<Props> = ({ setSidebarOpen }) => {
  const [clock, setClock] = useState("");
  const authFetch = useAuthFetch();
  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    authFetch.get("/v1/task").then((res: any) => {
      const { data } = res;

      setTasks(data);
    });
  }, []);

  setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  type Notification = [
    {
      title?: string;
      from?: string;
      to?: string;
      deadline?: any;
      description?: string;
    }?
  ];
  const [notifications, setNotifications] = useState<Notification>([]);

  useEffect(() => {
    // const eventSource = new EventSource(
    //   "http://localhost:3000/notifications?auth=" +
    //     localStorage.getItem("token")
    // );
    // eventSource.onmessage = ({ data }) => {
    //   if (data) {
    //     const chime = new Audio("/chime.mp3");
    //     chime.play();
    //     setNotifications(JSON.parse(data));
    //   }
    // };
  }, []);

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4">
      <div className="flex items-center w-11/12 lg:w-full">
        <div className="relative mx-0 text-lg md:text-2xl font-light bg-yellow-300 rounded-full px-3 py-1 w-24 md:w-32 text-center">
          {clock}
        </div>
        <div className="text-indigo-600 text-lg truncate px-2 flex-1">
          {
            tasks?.find(({ is_working }: { is_working: boolean }) => is_working)
              ?.title
          }
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>

          <div
            className="fixed inset-0 h-full w-full z-10"
            style={{ display: "none" }}
          ></div>

          <div
            x-show="dropdownOpen"
            className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
            style={{ display: "none" }}
          ></div>
        </div>
      </div>

      {notifications.length ? (
        <button
          onClick={() => setIsNotificationShown(!isNotificationShown)}
          className="fixed bottom-3 right-3 rounded-full bg-white p-2 shadow-md lg:shadow-none lg:relative z-50 lg:bottom-auto lg:right-auto"
        >
          <div className="rounded-full w-4 h-4 bg-indigo-500 text-xs text-white flex items-center justify-center right-1 top-1 absolute">
            {notifications.length}
          </div>
          <Bell />
        </button>
      ) : null}
      <div
        onClick={() => setIsNotificationShown(false)}
        className={`fixed right-2 transition transform bottom-12 lg:top-20 ${
          isNotificationShown
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } z-50 max-w-xs max-h-96 overflow-y-scroll rounded break-all`}
      >
        {notifications.map((notification) => (
          <div className="bg-white bg-opacity-90 border border-white rounded p-2 backdrop-blur-lg mb-2 shadow">
            <h3 className="font-bold text-sm">{notification?.from}</h3>
            <div className="text-xs text-indigo-500 font-bold">
              {new Date(notification?.deadline)
                .toLocaleString()
                .replace(/:.{2}$/, "")}
            </div>
            <p>{notification?.title}</p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
