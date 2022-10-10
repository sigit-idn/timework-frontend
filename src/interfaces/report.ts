import {Attendance} from "./attendance";
import {Task} from "./task";

export interface Report {
	id         : string;
	employeeId : string;
	date       : string;
	attendance?: Attendance;
	tasks?     : Task[];
}