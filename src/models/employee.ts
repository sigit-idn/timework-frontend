import { Role         } from "../enums/role";
import { BaseModel    } from "./base";
import { TaskModel    } from "./task";


export class EmployeeModel extends BaseModel {
	static resourcePath = "employees";

	constructor(
		public id        : string,
		public name      : string,
		public email     : string,
		public role      : Role,
		public phone?    : string,
		public address?  : string,
		public position  : string = "",
		public companyId?: string,
		public tasks?    : TaskModel[],
	) {
		super();
	}

	static fromJson(json: Record<string, any>): EmployeeModel {
		return new EmployeeModel(
			json.id,
			json.name,
			json.email,
			json.role,
			json.phone,
			json.address,
			json.position,
			json.companyId,
			json.tasks?.map((task: Record<string, any>) => TaskModel.fromJson(task)),
		);
	}
}

export interface EmployeeInput extends Omit<EmployeeModel, "id" | "tasks"> {
	password: string;
}