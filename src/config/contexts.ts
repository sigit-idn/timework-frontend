import { createContext } from "react";

type Task = [{
	title: string,
	is_working: false,
	deadline: string,
	description: string
}]

const TaskContext = createContext({
	tasks: [{
		title: "",
		is_working: false,
		deadline: "",
		description: ""
	}],
	setTasks(tasks: Task) { }
})

export { TaskContext };