import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TaskContext } from "../../../config/contexts";
import useAuthFetch from "../../../utils/authFetchHook";
import EditTask from "./EditTask";
import PostponeTask from "./PostponeTask";

const Task = ({
  title,
  deadline,
  description,
  is_working,
  finishedTasks,
  setFinishedTasks,
  _id,
  dataKey,
}: any) => {
  const { setTasks } = useContext(TaskContext);

  const authFetch = useAuthFetch();
  const { pathname } = useLocation();
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isPostponingTask, setIsPostponingTask] = useState(false);
  const deleteTask = () => {
    if (window.confirm("Are you sure to delete?"))
      authFetch
        .delete("/v1/task/" + _id)
        .then((res: any) => setTasks(res.data.tasks));
  };

  const editTask = () => setIsEditingTask(true);

  const workTask = () =>
    authFetch.put("/v1/task/work/" + _id).then((res: any) => {
      setTasks(res.data.tasks);
    });

  useEffect(
    (): any => finishedTasks && dataKey === 0 && workTask(),
    [finishedTasks]
  );

  const finishTask = async () => {
    try {
      authFetch.post("/v1/report/task", {
        task_start: localStorage.getItem("task_start"),
        task_end: new Date(),
        title,
        description,
      });

      const res: any = await authFetch.delete("/v1/task/" + _id);

      setTasks(res.data.tasks);
      localStorage.setItem("task_start", new Date().toLocaleString());
      setFinishedTasks(finishedTasks + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={`overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-2xl rounded-lg ${
          is_working ? "shadow-xl border-t-2 border-b-2 border-indigo-400" : ""
        }`}
      >
        <div className="w-full block h-full">
          <div className="bg-white w-full p-3 h-full flex flex-col justify-between">
            <div>
              <p className="text-indigo-500 text-2xl break-all font-medium max-h-16 overflow-y-scroll">
                {title}
              </p>
              <p className="text-gray-800 text-xs font-medium mt-1 mb-2">
                <span
                  className={`mr-1 px-2 py-1 w-1/4 rounded ${
                    new Date(deadline).getTime() - new Date().getTime() < 0
                      ? "bg-red-300"
                      : new Date(deadline).getTime() - new Date().getTime() <=
                        2 * 24 * 60 * 60 * 1000
                      ? "bg-yellow-300"
                      : "bg-gray-200"
                  }`}
                >
                  {is_working ? "Working..." : "Deadline"}
                </span>
                {new Date(deadline).toLocaleString().match(/.+(?=:\d{1,2})/)}
              </p>
              <p className="text-gray-600 font-light text-md h-28 overflow-y-scroll whitespace-pre-line">
                {description}
              </p>
            </div>
            {/friend/.test(pathname) ? null : (
              <div className="flex justify-between text-center items-center pt-3 text-xs text-white font-medium">
                <button
                  className="cursor-pointer mr-1 px-1 py-1 w-1/4 rounded bg-red-500 hover:bg-red-600"
                  onClick={deleteTask}
                >
                  Delete
                </button>
                <button
                  className="cursor-pointer mr-1 px-1 py-1 w-1/4 rounded bg-yellow-500 hover:bg-yellow-600"
                  onClick={editTask}
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    is_working ? setIsPostponingTask(true) : workTask()
                  }
                  className="px-1 py-1 w-1/4 rounded cursor-pointer mr-1 bg-indigo-500 hover:bg-indigo-600"
                >
                  {is_working ? "Postpone" : "Work"}
                </button>
                <button
                  onClick={finishTask}
                  className="cursor-pointer px-1 py-1 w-1/4 rounded bg-green-500 hover:bg-green-600"
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditingTask && (
        <EditTask
          setIsEditingTask={setIsEditingTask}
          setTasks={setTasks}
          title={title}
          deadline={deadline}
          description={description}
          _id={_id}
        />
      )}
      {isPostponingTask && (
        <PostponeTask
          setIsPostponingTask={setIsPostponingTask}
          setTasks={setTasks}
          title={title}
          deadline={deadline}
          description={description}
          _id={_id}
        />
      )}
    </>
  );
};

export default Task;
