import React, { useContext, useEffect, useState } from "react";
import { WorkingTaskContext                     } from "../../config/contexts";
import { TaskModel                              } from "../../models/task";

import Task    from "../cards/Task";
import AddTask from "../modals/AddTask";

const Tasks: React.FC = () => {
	const [finishedTasks, setFinishedTasks] = useState<TaskModel[]>([]);
	const [isAddingTask, setIsAddingTask]   = useState(false);
  const [tasks, setTasks]                 = useState<TaskModel[]>([]);
	const [_taskStart, setTaskStart]        = useState(new Date());
  const { setWorkingTask }                = useContext(WorkingTaskContext);
  
  useEffect(() => {
    if (!tasks.length) return;

    const workingTask = tasks.find(({ isWorking }) => isWorking);

    if (!workingTask || !setWorkingTask) return;
    
    setWorkingTask(workingTask);
    setTaskStart(new Date(workingTask.taskStart as string));
  }, [tasks]);

	useEffect(() => {
		TaskModel.getAll().then(setTasks);
	}, []);
	
	return (
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
	);
};

export default Tasks;