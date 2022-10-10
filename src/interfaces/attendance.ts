export interface Attendance {
	id         : string;
	employeeId : string;
	date       : string;
	workStart  : string;
	breakStart?: string;
	breakEnd?  : string;
	workEnd?   : string;
}