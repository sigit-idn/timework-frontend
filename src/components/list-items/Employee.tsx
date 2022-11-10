import React from 'react';
import { Link } from 'react-router-dom';
import { EmployeeModel } from '../../models/employee';


interface EmployeeProps extends Omit<EmployeeModel, 'email' | 'role'> {
	isAdmin: boolean;
}

const Employee: React.FC<EmployeeProps> = ({ id, name, position, tasks, isAdmin }) => {
	return (
		<tr key={id}>
		<td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 group">
			<div className="flex items-center">
				<div className="ml-4">
					<div className="text-sm leading-5 font-medium text-gray-900">
						{name}
						{isAdmin && (
								<>
									<Link
										to={`/friends/${id}/edit`}
										state={{ name }}
										className="py-1 px-2 bg-yellow-500 text-white rounded text-xs transition hover:bg-yellow-600 opacity-100 block md:opacity-0 group-hover:opacity-100"
									>
										Edit
									</Link>
									<Link
										to={`/friends/${id}/attendances`}
										state={{ name }}
										className="py-1 px-2 bg-green-500 text-white border block text-xs border-green-500 rounded md:hidden"
									>
										Attendance
									</Link>
									<Link
										to={`/friends/${id}/reports`}
										state={{ name }}
										className="py-1 px-2 bg-blue-500 text-white border block text-xs border-blue-500 rounded md:hidden"
									>
										Reports
									</Link>
								</>
							)}
					</div>
				</div>
			</div>
		</td>

		<td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200">
			<div className="hidden md:inline text-sm leading-5 text-gray-900">
				{position}
			</div>
		</td>

		<td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200">
			<span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100">
				{
					tasks?.find(({ isWorking }) => isWorking)?.title 
					?? <span className="text-gray-500">No Working Task</span>
				}
			</span>
			<div className="flex text-indigo-500 text-center md:hidden items-center relative w-20 mt-2">
				<span className="flex-1 py-1 border border-indigo-500 rounded-l">
					{tasks?.length}
				</span>
				<Link
					to={"/friends/tasks/" + id}
					state={{ name }}
					className="py-1 px-2 bg-indigo-500 text-white border border-indigo-500 rounded-r h-full"
				>
					View
				</Link>
			</div>
		</td>

		<td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500 w-32">
			<div className="hidden text-indigo-500 text-center md:flex items-center relative">
				<span className="flex-1 py-1 border border-indigo-500 rounded-l">
					{tasks?.length}
				</span>
				<Link
					to={`/friends/${id}/tasks`}
					state={{ name }}
					className="py-1 px-2 bg-indigo-500 text-white border border-indigo-500 rounded-r h-full"
				>
					View <span className="md:hidden">Tasks</span>
				</Link>
			</div>
		</td>
		{isAdmin && (
			<td className="md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500 w-32">
				<div className="text-center hidden md:flex">
					<Link
						to={`/friends/${id}/attendances`}
						state={{ name }}
						className="py-1 px-2 bg-green-500 text-white border border-green-500 rounded-l"
					>
						Attendance
					</Link>
					<Link
						to={`/friends/${id}/reports`}
						state={{ name }}
						className="py-1 px-2 bg-blue-500 text-white border border-blue-500 rounded-r"
					>
						Reports
					</Link>
				</div>
			</td>
		) }
	</tr>
	)
}

export default Employee;