import { BaseModel    } from "./base"

export class AttendanceModel extends BaseModel {
	static resourcePath = 'attendances'
	
	constructor(
		public employeeId : string,
		public date       : string,
		public workStart  : Date,
		public breakStart?: Date,
		public breakEnd?  : Date,
		public workEnd?   : Date
	) {
		super()
	}

	static async attend(action: "work_start" | "break_start" | "break_end" | "work_end"): Promise<AttendanceModel> {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/${this.resourcePath}/${action}`, {
			...BaseModel.options,
			method: 'POST',
		})

		return await res.json()
	}

	get totalWorkSeconds(): number {
		if (!this.workEnd || !this.breakStart || !this.breakEnd) return 0

		const workStart  = new Date(this.workStart)
		const breakStart = new Date(this.breakStart)
		const breakEnd   = new Date(this.breakEnd)
		const workEnd    = new Date(this.workEnd)

		const workSeconds = (
			( workEnd.getTime() - workStart.getTime() ) -
			( breakEnd.getTime() - breakStart.getTime() )
		) / 1000

		return workSeconds
	}
}
	