import { Task } from "./task";

export interface Employee {
	id?       : string;
	name      : string;
	email     : string;
	password? : string;
	role      : string;
	position  : string;
	companyId?: string;
	tasks?    : Task[];
}