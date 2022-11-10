import React, { useCallback, useEffect, useState } from "react";
import { useLocation                             } from "react-router";
import { TaskModel                               } from "../../models/task";

import EditTask from "../modals/EditTask";


interface TaskProps {
  finishedTasks: TaskModel[];
  setFinishedTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
  dataKey: number;
  task: TaskModel;
}

const Task: React.FC<TaskProps> = ({
  finishedTasks,
  setFinishedTasks,
  dataKey,
  task
}) => {
  const [ tasks, setTasks ] = useState<TaskModel[]>([]);

  const { pathname } = useLocation();
  const [ isEditingTask, setIsEditingTask ] = useState(false);

  useEffect(() => {
    TaskModel.getAll().then((tasks: TaskModel[]) => setTasks(tasks));
  }, []);
  
  const deleteTask = () => {
    if (window.confirm("Are you sure to delete?")) {
      TaskModel.delete(task.id).then(() => {
        setTasks(tasks?.filter(({ id }: TaskModel) => id !== task.id));

        setFinishedTasks(finishedTasks?.filter(({ id }: TaskModel) => id !== task.id));
      });
    }
  };

  const editTask = () => setIsEditingTask(true);

  const startTask = () =>
    TaskModel.start(task.id).then(() => {
      setTasks(
        tasks?.map(({ id }: TaskModel) => (
          task.id == id ? { ...task, isWorking: true } : task
        ) as TaskModel)
      );
    });

  useEffect(() => {
    finishedTasks && dataKey === 0 && startTask()
  }, [finishedTasks]);

  const finishTask = useCallback(async () => {
    try {
      await TaskModel.finish(task.id);

      setTasks(tasks?.filter(({ id }: TaskModel) => task.id != id));

      localStorage.setItem("task_start", new Date().format("yyyy-mm-dd hh:ii:ss"));
      setFinishedTasks([...finishedTasks, task]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <div
        className={`overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:shadow-2xl rounded-lg ${
          task.isWorking ? "shadow-xl border-t-2 border-b-2 border-indigo-400" : ""
        }`}
      >
        <div className="w-full block h-full">
          <div className="bg-white w-full p-3 h-full flex flex-col justify-between">
            <div>
              <p className="text-indigo-500 text-2xl break-all font-medium max-h-16 overflow-y-scroll">
                {task.title}
              </p>
              <p className="text-gray-800 text-xs font-medium mt-1 mb-2">
                <span
                  className={`mr-1 px-2 py-1 w-1/4 rounded ${
                    task.isOverdue
                      ? "bg-red-300"
                      : task.isLessThan3Days
                        ? "bg-yellow-300"
                        : "bg-gray-200"
                  }`}
                >
                  {task.isWorking ? "Working..." : "Deadline"}
                </span>
                {new Date(task.deadline).format("yyyy-mm-dd hh:ii")}
              </p>
              <p className="text-gray-600 font-light text-md h-28 overflow-y-scroll whitespace-pre-line">
                {task.description}
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
                  disabled={task.isWorking}
                  onClick={startTask}
                  className={`px-1 py-1 w-1/4 rounded cursor-pointer mr-1 bg-indigo-500 hover:bg-indigo-600 ${
                    task.isWorking ? "opacity-50" : ""
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
          task={task}
        />
      )}
    </>
  );
};

export default Task;
