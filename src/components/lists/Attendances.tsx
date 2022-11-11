import React, { ChangeEvent, useEffect, useState } from "react";
import { AttendanceModel                         } from "../../models/attendance";

import Attendance       from "../list-items/Attendance";
import BackToFriendList from "../buttons/BackToFriendList";

interface AttendanceProps {
  employeeId?: string;
  state?: {
    name: string;
  };
}

const Attendances: React.FC<AttendanceProps> = ({ employeeId, state }) => {
  const [ attendances, setAttendances ] = useState<AttendanceModel[]>([]);
  const [ month, setMonth ] = useState(new Date().format("yyyy-mm"));

  useEffect(() => {
    const where: Record<string, string> = { month };

    if (employeeId) {
      where.employeeId = employeeId;
    }

    AttendanceModel.getWhere(where).then(setAttendances);
  }, [month]);

  return (
    <>
      <div className="flex flex-col mt-2">
      { state?.name && <BackToFriendList name={state.name} /> }

        <label
          htmlFor="dateInput"
          className="px-3 border-b border-gray-300 bg-gray-50 text-left leading-4 font-medium text-gray-800 rounded-lg tracking-wider"
        >
          <input
            id="dateInput"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              setMonth(target.value.replace(/(\d{4})[/-](\d{2}).*/, "$1-$2"));
            }}
            className="border-0 bg-transparent text-sm"
            type="month"
            defaultValue={ new Date().format("yyyy-mm") }
          />
        </label>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Work Start
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Break Start
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Break End
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Work End
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Work Time
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {attendances.map(
                  (attendance: AttendanceModel) => (
                      <Attendance
                        key={attendance.id}
                        attendance={attendance}
                      />
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendances;
