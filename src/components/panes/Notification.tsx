// TODO: Add a notification system when backend is ready

import { Bell               } from "@geist-ui/react-icons";
import React, { useState    } from "react";

type Notification = [
  {
    title?      : string;
    from?       : string;
    to?         : string;
    deadline?   : Date;
    description?: string;
  }?
];

/**
 * @deprecated
 * The notification system is not yet implemented
 */
const Notification:React.FC = () => {
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [notifications, setNotifications] = useState<Notification>([]);

  React.useEffect(() => {
    const eventSource = new EventSource(
      process.env.REACT_APP_API_URL + "/notifications?auth=" +
        localStorage.getItem("token")
    );
    eventSource.onmessage = ({ data }) => {
      if (data) {
        const chime = new Audio("/chime.mp3");
        chime.play();
        setNotifications(JSON.parse(data));
      }
    };
  }, []);

  return (
    <>
      { notifications.length && (
        <button
          onClick={() => setIsNotificationShown(!isNotificationShown)}
          className="fixed bottom-3 right-3 rounded-full bg-white p-2 shadow-md lg:shadow-none lg:relative z-50 lg:bottom-auto lg:right-auto"
        >
          <div className="rounded-full w-4 h-4 bg-indigo-500 text-xs text-white flex items-center justify-center right-1 top-1 absolute">
            {notifications.length}
          </div>
          <Bell />
        </button>
      ) }
      <div
        onClick={() => setIsNotificationShown(false)}
        className={`fixed right-2 transition transform bottom-12 lg:top-20 ${
          isNotificationShown
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } z-50 max-w-xs max-h-96 overflow-y-scroll rounded break-all`}
      >
        {notifications.map((notification, i) => (
          <div key={i} className="bg-white bg-opacity-90 border border-white rounded p-2 backdrop-blur-lg mb-2 shadow">
            <h3 className="font-bold text-sm">{notification?.from}</h3>
            <div className="text-xs text-indigo-500 font-bold">
              {notification?.deadline?.format("hh:mm:ss")}
            </div>
            <p>{notification?.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};