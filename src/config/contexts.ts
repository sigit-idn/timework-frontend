import { createContext, Dispatch, SetStateAction } from "react";
import { TaskModel     } from "../models/task";

interface WorkingTaskContext {
	workingTask?: TaskModel;
	setWorkingTask?: Dispatch<SetStateAction<TaskModel | undefined>>;
}

const WorkingTaskContext = createContext<WorkingTaskContext>({});

export { WorkingTaskContext }