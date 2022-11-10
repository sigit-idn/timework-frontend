import React, { useCallback, useEffect, useState } from "react";
import { Attendance as AttendanceEnum            } from "../../enums/attendance";
import { AttendanceModel                         } from "../../models/attendance";


type Title = "Work Start" | "Work End" | "Break Start" | "Break End";

interface AttendanceButtonProps {
  title        : Title;
  subtitle     : string;
  dataKey      : AttendanceEnum;
  attendance   : AttendanceModel;
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceModel>>;
  cta          : AttendanceEnum;
  setCta       : React.Dispatch<React.SetStateAction<AttendanceEnum>>;
}

const AttendanceButton: React.FC<AttendanceButtonProps> = ({
  title,
  subtitle,
  dataKey,
  attendance,
  setAttendance,
  cta,
  setCta,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [key]                     = useState(title.camelize<keyof typeof AttendanceEnum>());
  
  useEffect(() => {
      setIsClicked(Boolean(attendance && attendance[key]));
  }, [attendance]);

  useEffect(() => {
    if (cta === dataKey && isClicked) {
      setCta(dataKey + 1);
    }
  }, [cta, isClicked]);
  
  

  const attend = useCallback(() => {
    AttendanceModel
      .attend(title.snakeize())
      .then(() => {

        setAttendance((attendance) => {
          attendance[key] = new Date();
          return attendance;
        });
        
        setIsClicked(true);

        console.log("after attend",
          { key, title, attendance, isClicked, value2: attendance[key]});

        if (title === "Work Start") {
          localStorage.setItem("taskStart", new Date().format("yyyy-mm-dd hh:ii:ss"));
        }
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
          }`
        }>
        <div className="mx-3">
          <h4
            className={`text-2xl font-semibold text-gray-${
              cta === dataKey ? 100 : 700
            }`}
          >
            { !isClicked 
              ? title 
              : attendance?.[key]?.format("hh:ii:ss")
            }
          </h4>
          <div className="text-gray-400">{!isClicked ? subtitle : title}</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceButton;
