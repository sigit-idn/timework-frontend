import React, { useEffect, useState } from "react";
import { ReportModel                } from "../../models/report";

import Report from "../list-items/Report";
import BackToFriendList from "../buttons/BackToFriendList";


interface ReportsProps {
	employeeId?: string;
	state?: {
		name: string;
	}
}


const Reports: React.FC<ReportsProps> = ({ employeeId, state }) => {
  const [ reports, setReports ] = useState<ReportModel[]>([]);
  const [ month, setMonth ] = useState(new Date().format("yyyy-mm"));

  useEffect(() => {
		const where: Record<string, string> = employeeId ? { employeeId, month } : { month };

    ReportModel.getWhere(where).then(setReports);
  }, [month]);

  return (
    <div className="flex flex-col mt-3">
      { state?.name && <BackToFriendList name={state.name} /> }

      <label
        htmlFor="dateInput"
        className="px-3 border-b border-gray-300 bg-gray-50 text-left leading-4 font-medium text-gray-800 rounded-lg tracking-wider"
      >
        <input
          id="dateInput"
          onChange={({ target }: { target: HTMLInputElement }) => {
            setMonth(target.value.match(/\d{4}-\d{2}/)?.[0] || month)
          }}
          className="border-0 bg-transparent text-sm"
          type="month"
          defaultValue={month}
        />
      </label>

      { reports
        ?.map((report: ReportModel, i: number) => (
          <Report setReports={setReports} report={report} key={i} />
        )) }
    </div>
  );
};

export default Reports;
