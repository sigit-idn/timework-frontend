import { ArrowLeft } from "@geist-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthFetch from "../utils/authFetchHook";

const Attendance = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [userId, setUserId] = useState("");
  const [attendances, setAttendances] = useState([]);
  const [month, setMonth] = useState(new Date().toLocaleDateString().replace(/(\d{4})[/-](\d{2}).*/, "$1-$2"));
  const authFetch = useAuthFetch();

  useEffect(() => {
    authFetch
      .get(`/attendances?${userId ? `userId=${userId}&` : ""}month=` + month)
      .then((data: any) => {
        setAttendances(data);
      });
  }, [month]);

  return (
    <>
      <div className="flex flex-col mt-2">
        {userId ? (
          <div className="flex items-center mb-5">
            <button
              className="rounded-full shadow hover:shadow-md bg-white p-1"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </button>
            <h1 className="text-xl ml-3 font-semibold">
              {state}
              <span className="font-light">'s Attendances</span>
            </h1>
          </div>
        ) : null}
        <label
          htmlFor="dateInput"
          className="px-3 border-b border-gray-300 bg-gray-50 text-left leading-4 font-medium text-gray-800 rounded-lg tracking-wider"
        >
          <input
            id="dateInput"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              setMonth(target.value.replace(/(\d{4})[/-](\d{2}).*/, "$1-$2"))
            }
            className="border-0 bg-transparent text-sm"
            type="month"
            defaultValue={
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1 < 10
                ? "0" + new Date().getMonth() + 1
                : new Date().getMonth() + 1)
            }
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
                  ({
                    date,
                    workStart,
                    breakStart,
                    breakEnd,
                    workEnd,
                  }: any) => {
                    const workSeconds =
                      new Date(workEnd).getTime() -
                      new Date(workStart).getTime() +
                      new Date(breakStart).getTime() -
                      new Date(breakEnd).getTime();

                    return (
                      <tr>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {new Date(date).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {workStart ? (
                            new Date(workStart).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {breakStart ? (
                            new Date(breakStart).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {breakEnd ? (
                            new Date(breakEnd).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {workEnd ? (
                            new Date(workEnd).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {isNaN(workSeconds)
                            ? "Unset"
                            : Math.floor(workSeconds / 60 / 60 / 1000) +
                              ":" +
                              (workSeconds % 60)}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
