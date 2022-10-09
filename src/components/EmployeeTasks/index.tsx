import { ArrowLeft } from "@geist-ui/react-icons";
import { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAuthFetch from "../../utils/authFetchHook";
import Task from "../Main/Task";
import AddTask from "../Main/Task/AddTask";

const EmployeeTask: FunctionComponent = () => {
  const authFetch = useAuthFetch();
  const { pathname, state: name } = useLocation();

  const userId = pathname.match(/\w{24}$/);

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [taskStart, setTaskStart] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    authFetch.get("/tasks?user-id=" + userId).then((res: any) => {
      const { data } = res;
      setTasks(data);
    });
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
              { deadline, title, description, is_working, _id }: any,
              i: number
            ) => (
              <Task
                key={i}
                dataKey={i}
                tasks={tasks}
                setTasks={setTasks}
                deadline={deadline}
                title={title}
                finishedTasks={finishedTasks}
                setFinishedTasks={setFinishedTasks}
                description={description}
                is_working={is_working}
                taskStart={taskStart}
                setTaskStart={setTaskStart}
                _id={_id}
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

        {isAddingTask ? (
          <AddTask
            userId={userId}
            name={name}
            setTasks={setTasks}
            setIsAddingTask={setIsAddingTask}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EmployeeTask;
