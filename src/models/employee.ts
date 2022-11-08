import { resourcePath } from "../decorators/resourcePath";
import { Role         } from "../enums/role";
import { BaseModel    } from "./base";
import { TaskModel    } from "./task";

@resourcePath("employees")
export class EmployeeModel extends BaseModel {
	constructor(
		public name      : string,
		public email     : string,
		public password  : string,
		public role      : Role,
		public phone?    : string,
		public address?  : string,
		public position  : string = "",
		public companyId?: string,
		public tasks?    : TaskModel[],
	) {
		super();
	}

}

export type EmployeeInput = Omit<EmployeeModel, "id" | "tasks">