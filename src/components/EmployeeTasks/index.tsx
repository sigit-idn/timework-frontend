import { ArrowLeft              } from "@geist-ui/react-icons";
import { FunctionComponent      } from "react";
import { useEffect, useState    } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation            } from "react-router-dom";
import { TaskModel              } from "../../models/task";

import Task from "../Main/Task";
import AddTask from "../Main/Task/AddTask";

const EmployeeTask: FunctionComponent = () => {
  const { id } = useParams();
  const { state: name } = useLocation();

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any>([]);
  const [finishedTasks, setFinishedTasks] = useState<any>([]);
  const [taskStart, setTaskStart] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    TaskModel.getWhere({ employee_id: id }).then(setTasks);
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
          ?.sort((a: any, b: any) =>
            new Date(a.deadline).getTime() > new Date(b.deadline).getTime()
              ? 1
              : -1
          )
          .map(
            (
              task: any,
              i: number
            ) => (
              <Task
                key={i}
                dataKey={i}
                task={task}
                finishedTasks={finishedTasks}
                setFinishedTasks={setFinishedTasks}
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
            userId={id}
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
