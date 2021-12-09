import { useContext, useState } from "react";
import { TaskContext } from "../../config/contexts";
import useAuthFetch from "../../utils/authFetchHook";

const Task = ({
  task_start,
  task_end,
  title,
  addTask,
  setReports,
  description,
  _id,
  isAdding,
  report_id,
}: any) => {
  const authFetch = useAuthFetch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const changeHandler = ({ target }: any) =>
    setEditData({ ...editData, [target.name]: target.value });

  const editTask = () => {
    setIsEditing(!isEditing);
    if (isEditing)
      authFetch
        .put(`/v1/report/${report_id}/${_id}`, editData)
        .then((res: any) => setReports(res.data.reports));
  };

  const deleteTask = () => {
    if (window.confirm("Are you sure to delete task from report?"))
      authFetch
        .delete(`/v1/report/${report_id}/${_id}`)
        .then((res: any) => setReports(res.data.reports));
  };

  return (
    <>
      <div className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-full">
            {isEditing ? (
              <>
                <div className="text-sm leading-5 mb-2 text-indigo-500">
                  <input
                    name="task_start"
                    onChange={changeHandler}
                    className="text-sm bg-gray-50 px-1 py-2 rounded ring-1 outline-none border-0 focus:ring-indigo-500 ring-gray-200"
                    type="time"
                    defaultValue={new Date(task_start)
                      .toLocaleTimeString()
                      .match(/\d{1,2}:\d{1,2}/)
                      ?.join("")
                      .replace(/^(?=\d:)/, "0")
                      .replace(/:(?=\d$)/, ":0")}
                  />
                  〜
                  <input
                    name="task_end"
                    onChange={changeHandler}
                    className="text-sm bg-gray-50 px-1 py-2 rounded ring-1 outline-none border-0 focus:ring-indigo-500 ring-gray-200"
                    type="time"
                    defaultValue={new Date(task_end)
                      .toLocaleTimeString()
                      .match(/\d{1,2}:\d{1,2}/)
                      ?.join("")
                      .replace(/^(?=\d:)/, "0")
                      .replace(/:(?=\d$)/, ":0")}
                  />
                </div>
                <input
                  name="title"
                  onChange={changeHandler}
                  className="text-sm leading-5 mb-2 font-medium text-gray-900 block w-full bg-gray-50 px-1 py-2 rounded ring-1 outline-none border-0 focus:ring-indigo-500 ring-gray-200"
                  defaultValue={title}
                />
                <textarea
                  name="description"
                  onChange={changeHandler}
                  className="text-sm leading-5 mb-2 text-gray-500 block w-full bg-gray-50 px-1 py-2 rounded ring-1 border-0 focus:ring-indigo-500 ring-gray-200"
                  defaultValue={description}
                />
              </>
            ) : (
              <>
                <div className="text-sm leading-5 mb-2 text-indigo-500">
                  {new Date(task_start).toLocaleTimeString().match(/.+(?=:)/)}〜
                  {new Date(task_end).toLocaleTimeString().match(/.+(?=:)/)}
                </div>
                <h3 className="text-sm leading-5 mb-2 font-medium text-gray-900">
                  {title}
                </h3>
                <p className="text-sm leading-5 mb-2 text-gray-500 whitespace-pre-line">
                  {description}
                </p>
              </>
            )}
            <div>
              <button
                className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-yellow-500 hover:bg-yellow-600 mr-1 text-white cursor-pointer"
                onClick={editTask}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              {/* <button
                className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-indigo-500 hover:bg-indigo-600 mr-1 text-white cursor-pointer"
                onClick={addTask}
              >
                Add
              </button> */}
              <button
                className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                onClick={deleteTask}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
