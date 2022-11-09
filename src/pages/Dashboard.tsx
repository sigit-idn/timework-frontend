import { TaskModel                              } from "../models/task";
import { WorkingTaskContext                     } from "../config/contexts";
import { AttendanceModel                        } from "../models/attendance";
import React, { useContext, useEffect, useState } from "react";

import AddTask          from "../components/Main/Task/AddTask";
import Attendance       from "../components/Main/Attendance";
import Task             from "../components/Main/Task";

const Dashboard: React.FC = () => {
  const [cta, setCta] = useState<1 | 2 | 3 | 4>(1);
  const [clock, setClock] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<AttendanceModel>();
  const [finishedTasks, setFinishedTasks] = useState<TaskModel[]>([]);
  const [_taskStart, setTaskStart] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { setWorkingTask } = useContext(WorkingTaskContext);
  
  
  useEffect(() => {
    TaskModel.getAll().then(setTasks).catch((err) => console.log({err}));

    const tickInterval = setInterval(() => setClock(new Date()), 1000);
    
    AttendanceModel.getWhere({ date: new Date().format("yyyy-MM-dd") })
    .then(([data]: AttendanceModel[]) => {
      setAttendance(data);
      
      // setCta((data && Object.keys(data).length - 1) ?? 1);
      setTaskStart(new Date());
    });

    return () => clearInterval(tickInterval);
  }, []);

  useEffect(() => {
    if (!tasks.length) return;

    const workingTask = tasks.find((task) => task.isWorking);

    if (!workingTask || !setWorkingTask) return;
    
    setWorkingTask(workingTask);
    setTaskStart(new Date(workingTask.taskStart as string));

  }, [tasks]);

  return (
    <>
      <h3 className="text-gray-700 font-bold text-3xl">
        {localStorage.getItem("name")}
      </h3>

      <div className="mt-1">
        <div className="flex flex-wrap -mx-2">
          {["Work Start", "Break Start", "Break End", "Work End"].map(
            (title: any, index: any) => (
              <Attendance
                key={index}
                title={title}
                subtitle={clock.format("hh:mm:ss")}
                attendance={attendance!}
                setCta={setCta}
                cta={cta}
                dataKey={index + 1}
              />
            )
          )}
        </div>
      </div>

      <h3 className="text-gray-700 text-3xl mt-7">Tasks</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-3">
        {tasks
          ?.map(
            (
              task: TaskModel,
              i: number
            ) => (
              <Task
                key={i}
                dataKey={i}
                finishedTasks={finishedTasks}
                setFinishedTasks={setFinishedTasks}
                task={task}
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
