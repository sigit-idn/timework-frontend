import { useContext, useEffect, useState } from "react";
import AddTask from "../components/Main/Task/AddTask";
import Attendance from "../components/Main/Attendance";
import Task from "../components/Main/Task";
import { Task as TaskInterface } from "../interfaces/task";
import useAuthFetch from "../utils/authFetchHook";
import useAuthorization from "../utils/authourizationHook";
import { TaskContext } from "../config/contexts";

const Dashboard = () => {
  const [cta, setCta] = useState(1);
  const [clock, setClock] = useState("");
  const authorize = useAuthorization();
  const authFetch = useAuthFetch();
  const { tasks } = useContext(TaskContext);
  const [attendances, setAttendances] = useState({});
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [taskStart, setTaskStart] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
  
  useEffect(() => {
    authorize("employee");

    authFetch.get("/attendances?date=" + new Date().toLocaleDateString().replace(/\//g, "-"))
    .then(([data]: any) => {
      
      setAttendances(data);

      // setCta((data && Object.keys(data).length - 1) ?? 1);
      setTaskStart(new Date());
    });
  }, []);

  return (
    <>
      <h3 className="text-gray-700 font-bold text-3xl">
        {localStorage.getItem("name")}
      </h3>

      <div className="mt-1">
        <div className="flex flex-wrap -mx-2">
          <Attendance
            title="Start Work"
            subtitle={clock}
            attendances={attendances}
            name="work_start"
            setCta={setCta}
            cta={cta}
            dataKey={1}
          />
          <Attendance
            title="Start Break"
            subtitle={clock}
            attendances={attendances}
            name="break_start"
            setCta={setCta}
            cta={cta}
            dataKey={2}
          />
          <Attendance
            title="End Break"
            subtitle={clock}
            attendances={attendances}
            name="break_end"
            setCta={setCta}
            cta={cta}
            dataKey={3}
          />
          <Attendance
            title="End Work"
            subtitle={clock}
            attendances={attendances}
            name="work_end"
            setCta={setCta}
            cta={cta}
            dataKey={4}
          />
        </div>
      </div>

      <h3 className="text-gray-700 text-3xl mt-7">Tasks</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-3">
        {tasks
          ?.filter(({ taskEnd }: TaskInterface) => !taskEnd)
          ?.map(
            (
              { deadline, title, description, reportId, isWorking, id }: TaskInterface,
              i: number
            ) => (
              <Task
                key={i}
                dataKey={i}
                deadline={deadline}
                title={title}
                finishedTasks={finishedTasks}
                setFinishedTasks={setFinishedTasks}
                description={description}
                isWorking={isWorking}
                reportId={reportId}
                taskStart={taskStart}
                setTaskStart={setTaskStart}
                id={id}
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

        {isAddingTask ? <AddTask setIsAddingTask={setIsAddingTask} /> : ""}
      </div>
    </>
  );
};

export default Dashboard;
