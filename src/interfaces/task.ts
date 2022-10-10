export interface Task {
	id?        : string;
	title      : string;
	employeeId?: string;
	reportId?  : string;
	isWorking  : boolean;
	deadline   : string;
	description: string;
	taskStart? : string;
	taskEnd?   : string;
}