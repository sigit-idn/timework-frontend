import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuthFetch from "../../utils/authFetchHook";

const Attendance = ({
  title,
  setCta,
  subtitle,
  dataKey,
  attendances,
  cta,
  name,
}: any) => {
  const authFetch = useAuthFetch();
  const redirect = useNavigate();
  const formatTime = (time: string) => new Date(time).toLocaleTimeString();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    setIsClicked(Boolean(attendances && attendances[name]));
    setTime(formatTime(attendances && attendances[name]));
  }, [attendances, name]);

  useEffect(() => {
    if (cta === dataKey && isClicked) setCta(dataKey + 1);
  }, [cta, isClicked, dataKey, setCta]);

  const attend = () => {
    authFetch
      .post("/v1/attendance/" + name)
      .then((res: any) => {
        const { data } = res;
        setTime(formatTime(data[name]));
        setIsClicked(true);
        if (name === "work_start")
          localStorage.setItem("task_start", new Date().toLocaleString());
      })
      .catch((url) => redirect(url));
  };
  return (
    <div onClick={attend} className="mt-3 px-2 w-1/2 cursor-pointer">
      <div
        className={`flex md:px-10 items-center py-6 shadow-sm rounded-md  transition duration-500 ${
          cta === dataKey
            ? "bg-indigo-500 shadow-lg hover:shadow-2xl"
            : isClicked
            ? "bg-gray-300 shadow-inner"
            : "bg-white hover:shadow-2xl"
        }`}
      >
        <div className="mx-3">
          <h4
            className={`text-2xl font-semibold text-gray-${
              cta === dataKey ? 100 : 700
            }`}
          >
            {!isClicked ? title : time}
          </h4>
          <div className="text-gray-400">{!isClicked ? subtitle : title}</div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
