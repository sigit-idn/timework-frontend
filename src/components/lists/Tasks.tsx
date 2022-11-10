import React, { useContext, useEffect, useState } from "react";
import { WorkingTaskContext                     } from "../../config/contexts";
import { TaskModel                              } from "../../models/task";

import Task    from "../list-items/Task";
import AddTask from "../modals/AddTask";

const Tasks: React.FC = () => {
	const [isAddingTask, setIsAddingTask]   = useState(false);
  const [tasks, setTasks]                 = useState<TaskModel[]>([]);
	const [_taskStart, setTaskStart]        = useState(new Date());
  const { setWorkingTask }                = useContext(WorkingTaskContext);
  
  useEffect(() => {
    if (!tasks.length) return;

    const workingTask = tasks.find(({ isWorking }) => isWorking);

    if (!workingTask || !setWorkingTask) return;
    
    setWorkingTask(workingTask);

		if (workingTask.taskStart) {
			setTaskStart(workingTask.taskStart);
		}
  }, [tasks]);

	useEffect(() => {
		TaskModel.getWhere({ taskEnd: "" }).then(setTasks);
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
						task={task}
						setTasks={setTasks}
					/>
				)
			)}

		<button
			type="button"
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