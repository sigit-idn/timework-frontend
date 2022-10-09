import { ArrowLeft } from "@geist-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthFetch from "../utils/authFetchHook";

const Attendance = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const userId = pathname.match(/\w{24}/);
  const [attendances, setAttendances] = useState([]);
  const [month, setMonth] = useState(new Date().toLocaleDateString());
  const authFetch = useAuthFetch();

  useEffect(() => {
    authFetch
      .get(
        `/attendance?${userId ? "userId=" + userId + "&" : ""}month=` + month
      )
      .then((res: any) => {
        const { data } = res;

        setAttendances(
          data.sort((a: any, b: any) =>
            new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
          )
        );
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
              setMonth(new Date(target.value).toLocaleDateString())
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
                    work_start,
                    break_start,
                    break_end,
                    work_end,
                  }: any) => {
                    const workSeconds =
                      new Date(work_end).getTime() -
                      new Date(work_start).getTime() +
                      new Date(break_start).getTime() -
                      new Date(break_end).getTime();

                    return (
                      <tr>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {new Date(date).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {work_start ? (
                            new Date(work_start).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {break_start ? (
                            new Date(break_start).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {break_end ? (
                            new Date(break_end).toLocaleTimeString()
                          ) : (
                            <span className="text-gray-500">Unset</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                          {work_end ? (
                            new Date(work_end).toLocaleTimeString()
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
