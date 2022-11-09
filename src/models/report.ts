import { AttendanceModel } from "./attendance";
import { BaseModel       } from "./base";
import { TaskModel       } from "./task";


export class ReportModel extends BaseModel {
	static resourcePath = "reports";

	constructor(
		public employeeId : string,
		public date       : string,
		public attendance?: AttendanceModel,
		public tasks?     : TaskModel[],
		public notes?     : string,
	) {
		super();
	}

}