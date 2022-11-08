import { useCallback, useEffect, useState } from "react";
import { useNavigate                      } from "react-router";
import { AttendanceModel                  } from "../../models/attendance";

type Title      = "Work Start" | "Work End" | "Break Start" | "Break End";
type CamelTitle = "workStart"  | "workEnd"  | "breakStart"  | "breakEnd";

interface AttendanceProps {
  title: Title;
  subtitle: string;
  dataKey: 1 | 2 | 3 | 4;
  attendance: AttendanceModel;
  cta: 1 | 2 | 3 | 4;
  setCta: (cta: 1 | 2 | 3 | 4) => void;
}

const Attendance = ({
  title,
  setCta,
  subtitle,
  dataKey,
  attendance,
  cta,
}: AttendanceProps) => {
  const redirect = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  
  useEffect(() => {
    setIsClicked(
      Boolean(
        attendance 
        && attendance[title.camelize<CamelTitle>()]
        )
      );
  }, [attendance, title]);

  useEffect(() => {
    if (cta === dataKey && isClicked) setCta(dataKey + 1 as 1 | 2 | 3 | 4);
  }, [cta, isClicked, dataKey, setCta]);
  

  const attend = useCallback(() => {
    AttendanceModel
      .attend(title.snakeize())
      .then((res: any) => {

      setIsClicked(true);
      if (title === "Work Start")
        localStorage.setItem("task_start", new Date().toLocaleString());
    });
  }, []);

  return (
    <div onClick={attend} className="mt-3 px-2 w-1/2 cursor-pointer">
      <div
        className={`flex md:px-10 items-center py-6 shadow-sm rounded-md transition transform duration-500 ${
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
            {!isClicked ? title : new Date(attendance[title.camelize<CamelTitle>()]!).format("hh:mm:ss")}
          </h4>
          <div className="text-gray-400">{!isClicked ? subtitle : title}</div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
