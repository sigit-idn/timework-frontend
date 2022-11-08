import { createContext } from "react";
import { TaskModel     } from "../models/task";

const WorkingTaskContext = createContext({
	workingTask: {} as TaskModel|undefined,
	setWorkingTask: (task?: TaskModel) => {},
})

export { WorkingTaskContext }