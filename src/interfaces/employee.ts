import { Role } from "../enums/role";
import { Task } from "./task";

export interface Employee {
	id?       : string;
	name      : string;
	email     : string;
	password? : string;
	role      : Role;
	phone?		: string;
	address?	: string;
	position  : string;
	companyId?: string;
	tasks?    : Task[];
}