import { createContext } from "react";
import { Task } from "../interfaces/task";

const TaskContext = createContext({
	tasks: [] as Task[],
	setTasks(tasks: Task[]) { }
})

export { TaskContext };