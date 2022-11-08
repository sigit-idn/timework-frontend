import { resourcePath } from "../decorators/resourcePath"
import { BaseModel    } from "./base"

@resourcePath('attendances')
export class AttendanceModel extends BaseModel {
	constructor(
		public employeeId : string,
		public date       : string,
		public workStart  : Date,
		public breakStart?: Date,
		public breakEnd?  : Date,
		public workEnd?   : Date
	) {
		super()
		this.workStart = new Date(workStart)
		this.breakStart = breakStart ? new Date(breakStart) : undefined
		this.breakEnd = breakEnd ? new Date(breakEnd) : undefined
		this.workEnd = workEnd ? new Date(workEnd) : undefined
	}

	static async attend(action: "work_start" | "break_start" | "break_end" | "work_end"): Promise<AttendanceModel> {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/${this.resourcePath}/${action}`, {
			...BaseModel.options,
			method: 'POST',
		})

		return await res.json()
	}
}
	