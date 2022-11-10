import React, { useEffect, useState } from 'react';
import { AttendanceModel            } from '../../models/attendance';

import Attendance from '../list-items/Attendance';

const Attendances: React.FC = () => {
	const [cta, setCta]               = useState<1 | 2 | 3 | 4>(1);
  const [clock, setClock]           = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<AttendanceModel>();

  useEffect(() => {
    const tickInterval = setInterval(() => setClock(new Date()), 1000);
    
    AttendanceModel.getWhere({ date: new Date().format("yyyy-MM-dd") })
    .then(([data]: AttendanceModel[]) => {
      setAttendance(data);
      
      // setCta((data && Object.keys(data).length - 1) ?? 1);
      // setTaskStart(new Date());
    });
    
    return () => clearInterval(tickInterval);
  }, []);
	
	return (
		<div className="mt-1">
			<div className="flex flex-wrap -mx-2">
				{["Work Start", "Break Start", "Break End", "Work End"].map(
					(title: any, index: any) => (
						<Attendance
							key={index}
							title={title}
							subtitle={clock.format("hh:mm:ss")}
							attendance={attendance!}
							setCta={setCta}
							cta={cta}
							dataKey={index + 1}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Attendances;