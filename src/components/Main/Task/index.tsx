import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TaskContext } from "../../../config/contexts";
import { Task as TaskInterface } from "../../../interfaces/task"; 
import useAuthFetch from "../../../utils/authFetchHook";
import EditTask from "./EditTask";

const Task = ({
  title,
  deadline,
  description,
  isWorking,
  reportId,
  finishedTasks,
  setFinishedTasks,
  id,
  dataKey,
}: any) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const authFetch = useAuthFetch();
  const { pathname } = useLocation();
  const [isEditingTask, setIsEditingTask] = useState(false);
  
  const deleteTask = () => {
    if (window.confirm("Are you sure to delete?"))
      authFetch
        .delete("/tasks/" + id)
        .then(() => setTasks(tasks?.filter(({ id: taskId }: TaskInterface) => id != taskId)));
  };

  const editTask = () => setIsEditingTask(true);

  const startTask = () =>
    authFetch.post(`/tasks/${id}/start`).then(() => {
      setTasks(
        tasks?.map((task: TaskInterface, i: number) =>
          i == dataKey ? { ...task, isWorking: true } : { ...task, isWorking: false }
        )
      );
    });

  useEffect(
    (): any => finishedTasks && dataKey === 0 && startTask(),
    [finishedTasks]
  );

  const finishTask = useCallback(async () => {
    try {
      authFetch.post(`/tasks/${id}/finish`).then(() => {
        setTasks(
          tasks?.filter((task: TaskInterface) => task.id != id)
        );
        
        setFinishedTasks(finishedTasks + 1);
      });

      const res: any = await authFetch.delete("/tasks/" + id);

      setTasks(res.data.tasks);
      localStorage.setItem("task_start", new Date().toLocaleString());
      setFinishedTasks(finishedTasks + 1);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <div
        className={`overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-2xl rounded-lg ${
          isWorking ? "shadow-xl border-t-2 border-b-2 border-indigo-400" : ""
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
                  {isWorking ? "Working..." : "Deadline"}
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
                  disabled={isWorking}
                  onClick={startTask}
                  className={`px-1 py-1 w-1/4 rounded cursor-pointer mr-1 bg-indigo-500 hover:bg-indigo-600 ${
                    isWorking ? "opacity-50" : ""
                  }`}
                >
                  Work
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
          tasks={tasks}
          title={title}
          deadline={deadline}
          description={description}
          isWorking={isWorking}
          reportId={reportId}
          id={id}
        />
      )}
    </>
  );
};

export default Task;
