import { BaseModel } from "./base"

export class TaskModel extends BaseModel {
	static resourcePath = "tasks"

	public constructor(
		public id         : string,
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

	public static fromJson(json: Record<string, any>): TaskModel {
		return new TaskModel(
			json.id,
			json.title,
			json.employeeId,
			json.reportId,
			json.isWorking,
			new Date(json.deadline),
			json.description,
			json.taskStart,
			json.taskEnd
		)
	}

	static async start(id: string): Promise<TaskModel> {
		const data = await BaseModel._fetch("POST", `${this.resourcePath}/${id}/start`)

		return this.fromJson(data)
	}

	static async finish(id: string): Promise<TaskModel> {
		const data = await BaseModel._fetch("POST", `${this.resourcePath}/${id}/finish`)
		
		return this.fromJson(data)
	}

	get isOverdue(): boolean {
		return new Date(this.deadline) < new Date()
	}

	get isLessThan3Days(): boolean {
		return new Date(this.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
	}
}

export type TaskInput = Omit<TaskModel, "id" | "isOverdue" | "isLessThan3Days">