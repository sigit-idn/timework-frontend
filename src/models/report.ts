import { AttendanceModel } from "./attendance";
import { BaseModel       } from "./base";
import { TaskModel       } from "./task";


export class ReportModel extends BaseModel {
	static resourcePath = "reports";

	constructor(
		public id         : string,
		public employeeId : string,
		public date       : string,
		public attendance?: AttendanceModel,
		public tasks?     : TaskModel[],
		public notes?     : string,
	) {
		super();
	}

	public static fromJson(json: Record<string, any>): ReportModel {
		return new ReportModel(
			json.id,
			json.employeeId,
			json.date,
			json.attendance ? AttendanceModel.fromJson(json.attendance) : undefined,
			json.tasks?.map((task: Record<string, any>) => TaskModel.fromJson(task)),
			json.notes,
		);
	}

}