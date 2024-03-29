import React, { useEffect, useState } from 'react';
import { EmployeeModel              } from '../../models/employee';
import { useSelector } from "react-redux";

import Employee from '../list-items/Employee';


const Employees: React.FC = () => {
	const [employees, setEmployees] = useState<EmployeeModel[]>([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const role = useSelector((state: any) => state.auth.role);

	useEffect(() => {
		setIsAdmin(/admin/i.test(role));

		EmployeeModel.getAll().then(setEmployees);
	}, []);

	return (
		<div className="flex flex-col mt-8">
			<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
				<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
					<table className="min-w-full">
						<thead>
							<tr>
								<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
									Name
								</th>
								<th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
									<span className="hidden md:inline">Title</span>
								</th>
								<th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left hidden md:table-cell text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
									<span className="hidden md:inline">Tasks</span>
								</th>
								{isAdmin && (
									<th className="md:px-6 py-3 border-b border-gray-200 bg-gray-50 text-left hidden md:table-cell text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										<span className="hidden md:inline">View</span>
									</th>
								)}
							</tr>
						</thead>

						<tbody className="bg-white">
							{employees.map(
								(employee: EmployeeModel) => (
									<Employee 
										key={employee.id}
										employee={employee}
										isAdmin={isAdmin}
									/>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Employees;