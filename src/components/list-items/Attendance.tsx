import React from 'react';
import { AttendanceModel } from '../../models/attendance';

const Attendance: React.FC<{ attendance: AttendanceModel }> = ({ 
	attendance: { date, workStart, workEnd, breakStart, breakEnd, totalWorkTime }
}) => {
	return (
		<tr>
			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
				{date}
			</td>

			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
				{workStart ? (
					workStart.format('hh:ii')
				) : (
					<span className="text-gray-500">Unset</span>
				)}
			</td>

			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
				{breakStart ? (
					breakStart.format('hh:ii')
				) : (
					<span className="text-gray-500">Unset</span>
				)}
			</td>

			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
				{breakEnd ? (
					breakEnd.format('hh:ii')
				) : (
					<span className="text-gray-500">Unset</span>
				)}
			</td>

			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
				{workEnd ? (
					workEnd.format('hh:ii')
				) : (
					<span className="text-gray-500">Unset</span>
				)}
			</td>

			<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
				{totalWorkTime ? (
					totalWorkTime.format("hh:ii")
				) : (
					<span className="text-gray-500">Unset</span>
				)}
			</td>
		</tr>
	);
};

export default Attendance;