import React, { useEffect, useState } from "react";
import { TaskModel                  } from "../../models/task";

import Task             from "../list-items/Task";
import AddTask          from "../modals/AddTask";
import BackToFriendList from "../buttons/BackToFriendList";

interface TasksProps {
	employeeId?: string
	state?     : { name : string };
}

const Tasks: React.FC<TasksProps> = ({ employeeId, state }) => {
	const [ modalShown, setModalShown ] = useState(false);
  const [ tasks, setTasks ] = useState<TaskModel[]>([]);

  useEffect(() => {
    const where: Record<string, string> = employeeId 
    ? { employeeId, taskEnd: "null" }
    : { taskEnd: "null" };

    TaskModel.getWhere(where).then((tasks) => setTasks(tasks));
  }, []);

	return (
		<section>
			{ state 
				? <BackToFriendList name={state.name} />
				: <h2 className="text-gray-700 text-3xl mt-7">Tasks</h2>
			}

			<ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-3">
			{tasks
				?.map(
					(task: TaskModel, i: number) => (
						<Task
							key={i}
							task={task}
							setTasks={setTasks}
						/>
					)
				)}

			<button
				type="button"
				className="rounded py-16 text-center opacity-50 border-dashed border-2 border-gray-500"
				onClick={() => setModalShown(true)}
			>
				<div className="text-5xl">+</div>
				<div className="py-2">Add Task</div>
			</button>

			{modalShown && (
				<AddTask 
					unmountModal={() => setModalShown(false)}
					setTasks={setTasks}
				/>
			)}
		</ul>
	</section>
	);
};

export default Tasks;