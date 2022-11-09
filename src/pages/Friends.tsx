import React, { useEffect, useState } from "react";
import { Link                       } from "react-router-dom";
import { EmployeeModel              } from "../models/employee";

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<EmployeeModel[]>([]);
  
  useEffect(() => {
    EmployeeModel.getAll().then(setFriends)
  }, []);

  return (
    <div className="flex flex-col mt-8">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Title</span>
                </th>
                <th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left hidden md:table-cell text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden md:inline">Tasks</span>
                </th>
                {/admin/.test(String(localStorage.getItem("role"))) ? (
                  <th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left hidden md:table-cell text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    <span className="hidden md:inline">View</span>
                  </th>
                ) : null}
              </tr>
            </thead>

            <tbody className="bg-white">
              {friends.map(
                ({ name, tasks, position, id }: EmployeeModel) => (
                  <tr key={id}>
                    <td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 group">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {name}
                            {/admin/.test(
                              String(localStorage.getItem("role"))
                            ) && (
                              <>
                                <Link
                                  to={`/friends/${id}/edit`}
                                  state={name}
                                  className="py-1 px-2 bg-yellow-500 text-white rounded text-xs transition hover:bg-yellow-600 opacity-100 block md:opacity-0 group-hover:opacity-100"
                                >
                                  Edit
                                </Link>
                                <Link
                                  to={`/friends/${id}/attendances`}
                                  state={name}
                                  className="py-1 px-2 bg-green-500 text-white border block text-xs border-green-500 rounded md:hidden"
                                >
                                  Attendance
                                </Link>
                                <Link
                                  to={`/friends/${id}/reports`}
                                  state={name}
                                  className="py-1 px-2 bg-blue-500 text-white border block text-xs border-blue-500 rounded md:hidden"
                                >
                                  Reports
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="hidden md:inline text-sm leading-5 text-gray-900">
                        {position}
                      </div>
                    </td>

                    <td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100">
                        {tasks?.find(({ isWorking }) => isWorking)?.title}
                      </span>
                      <div className="flex text-indigo-500 text-center md:hidden items-center relative w-20 mt-2">
                        <span className="flex-1 py-1 border border-indigo-500 rounded-l">
                          {tasks?.length}
                        </span>
                        <Link
                          to={"/friends/tasks/" + id}
                          state={name}
                          className="py-1 px-2 bg-indigo-500 text-white border border-indigo-500 rounded-r h-full"
                        >
                          View
                        </Link>
                      </div>
                    </td>

                    <td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500 w-32">
                      <div className="hidden text-indigo-500 text-center md:flex items-center relative">
                        <span className="flex-1 py-1 border border-indigo-500 rounded-l">
                          {tasks?.length}
                        </span>
                        <Link
                          to={`/friends/${id}/tasks`}
                          state={name}
                          className="py-1 px-2 bg-indigo-500 text-white border border-indigo-500 rounded-r h-full"
                        >
                          View <span className="md:hidden">Tasks</span>
                        </Link>
                      </div>
                    </td>
                    {/admin/.test(String(localStorage.getItem("role"))) ? (
                      <td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500 w-32">
                        <div className="text-center hidden md:flex">
                          <Link
                            to={`/friends/${id}/attendances`}
                            state={name}
                            className="py-1 px-2 bg-green-500 text-white border border-green-500 rounded-l"
                          >
                            Attendance
                          </Link>
                          <Link
                            to={`/friends/${id}/reports`}
                            state={name}
                            className="py-1 px-2 bg-blue-500 text-white border border-blue-500 rounded-r"
                          >
                            Reports
                          </Link>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Friends;
