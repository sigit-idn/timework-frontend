import { resourcePath    } from "../decorators/resourcePath";
import { AttendanceModel } from "./attendance";
import { BaseModel       } from "./base";
import { TaskModel       } from "./task";

@resourcePath("reports")
export class ReportModel extends BaseModel {

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