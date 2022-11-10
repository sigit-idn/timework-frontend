import React, { useEffect, useState   } from 'react';
import { Attendance as AttendanceEnum } from '../../enums/attendance';
import { AttendanceModel              } from '../../models/attendance';

import AttendanceButton from '../list-items/AttendanceButton';

const AttendanceButtons: React.FC = () => {
	const [cta, setCta]               = useState<AttendanceEnum>(AttendanceEnum.workStart);
  const [clock, setClock]           = useState<string>(new Date().format("hh:ii:ss"));
  const [attendance, setAttendance] = useState<AttendanceModel>({} as AttendanceModel);
	

  useEffect(() => {
		AttendanceModel.getWhere({ date: new Date().format("yyyy-mm-dd") })
    .then(([data]: AttendanceModel[]) => {
			setAttendance(data);

			if (!data) {
				return setCta(AttendanceEnum.workStart);
			} 

			for (const [key, value] of Object.entries(data)) {
				if (!(key in AttendanceEnum)) {
					continue;
				}

				if (value) {
					continue;
				}

				return setCta(AttendanceEnum[key as keyof typeof AttendanceEnum]);
			}

			setCta(AttendanceEnum.workEnd);
    });
    
		const tickInterval = setInterval(() => {
			setClock(new Date().format("hh:ii:ss"));
		}, 1000);

    return () => clearInterval(tickInterval);
  }, []);
	
	return (
		<div className="mt-1">
			<div className="flex flex-wrap -mx-2">
				{ ["Work Start", "Break Start", "Break End", "Work End"].map(
						(title: any, index: any) => (
							<AttendanceButton
								key={index}
								title={title}
								subtitle={clock}
								attendance={attendance}
								setAttendance={setAttendance}
								setCta={setCta}
								cta={cta}
								dataKey={index + 1}
							/>
						)
					) }
			</div>
		</div>
	);
};

export default AttendanceButtons;