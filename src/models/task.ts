import { BaseModel } from "./base"

export class TaskModel extends BaseModel {
	static resourcePath = "tasks"

	public constructor(
		public title      : string,
		public employeeId?: string,
		public reportId?  : string,
		public isWorking  : boolean = false,
		public deadline   : Date    = new Date(),
		public description: string  = "",
		public taskStart? : string,
		public taskEnd?   : string,
	) {
		super()
	}

	static async start(id: string): Promise<TaskModel> {
		const res = await fetch(`${BaseModel.baseUrl}/${this.resourcePath}/${id}/start`, {
			...BaseModel.options,
			method: "POST",
		})
		return await res.json()
	}

	static async finish(id: string): Promise<TaskModel> {
		const res = await fetch(`${BaseModel.baseUrl}/${this.resourcePath}/${id}/finish`, {
			...BaseModel.options,
			method: "POST",
		})
		return await res.json()
	}

	get isOverdue(): boolean {
		return new Date(this.deadline) < new Date()
	}

	get isLessThan3Days(): boolean {
		return new Date(this.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
	}
}

export type TaskInput = Omit<TaskModel, "id" | "isOverdue" | "isLessThan3Days">