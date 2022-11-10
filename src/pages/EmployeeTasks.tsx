import { ArrowLeft                  } from "@geist-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams     } from "react-router";
import { useLocation                } from "react-router-dom";
import { TaskModel                  } from "../models/task";

import Task    from "../components/list-items/Task";
import AddTask from "../components/modals/AddTask";

const EmployeeTask: React.FC = () => {
  const { employeeId } = useParams();
  const { state: name } = useLocation();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    TaskModel.getWhere({ employeeId: String(employeeId), taskEnd: "" }).then(setTasks);
  }, []);

  return (
    <>
      <div className="flex items-center">
        <button
          className="rounded-full shadow hover:shadow-md bg-white p-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>
        <h1 className="text-xl ml-3">{name}</h1>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-3">
        {tasks
          ?.sort((a: TaskModel, b: TaskModel) => 
            a.deadline.getTime() > b.deadline.getTime()
              ? 1
              : -1
          )
          .map(
            (
              task: TaskModel,
              i: number
            ) => (
              <Task
                key={i}
                dataKey={i}
                task={task}
                setTasks={setTasks}
              />
            )
          )}

        <button
          className="rounded py-16 text-center opacity-50 border-dashed border-2 border-gray-500"
          onClick={() => setIsAddingTask(true)}
        >
          <div className="text-5xl">+</div>
          <div className="py-2">Add Task</div>
        </button>

        {isAddingTask && (
          <AddTask
            employeeId={employeeId}
            name={name}
            setTasks={setTasks}
            setIsAddingTask={setIsAddingTask}
          />
        )}
      </div>
    </>
  );
};

export default EmployeeTask;
