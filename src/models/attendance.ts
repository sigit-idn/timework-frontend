import { BaseModel } from "./base"
import { Duration  } from "./durations"

export class AttendanceModel extends BaseModel {
	static resourcePath = 'attendances'
	
	public constructor(
		public id         : string,
		public employeeId : string,
		public date       : string,
		public workStart  : Date,
		public breakStart?: Date,
		public breakEnd?  : Date,
		public workEnd?   : Date
	) {
		super()
	}

	public static fromJson(json: Record<string, any>): AttendanceModel {
		return new AttendanceModel(
			json.id,
			json.employeeId,
			json.date,
			new Date(json.workStart),
			json.breakStart ? new Date(json.breakStart) : undefined,
			json.breakEnd ? new Date(json.breakEnd) : undefined,
			json.workEnd ? new Date(json.workEnd) : undefined
		)
	}

	static async attend(
		action: "work_start" | "break_start" | "break_end" | "work_end"
	): Promise<AttendanceModel> {
		const data = BaseModel._fetch("POST", `${this.resourcePath}/${action}`)

		return this.fromJson(data)
	}

	get totalWorkTime(): Duration {
		if (!this.workEnd || !this.breakStart || !this.breakEnd) {
			return new Duration(0)
		}

		const workMiliseconds = (
			( this.workEnd.getTime() - this.workStart.getTime() ) -
			( this.breakEnd.getTime() - this.breakStart.getTime() )
		)

		if (workMiliseconds < 0) {
			return new Duration(0)
		}

		return new Duration(workMiliseconds)
	}
}
	