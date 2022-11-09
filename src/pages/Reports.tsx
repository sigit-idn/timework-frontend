import { ArrowLeft                  } from "@geist-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate   } from "react-router-dom";
import { ReportModel                } from "../models/report";

import Report from "../components/Reports/Report";


const Reports: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ userId, setUserId ] = useState("");
  const [ reports, setReports ] = useState<ReportModel[]>([]);
  const [ month, setMonth ] = useState(new Date().format("YYYY-MM"));

  useEffect(() => {
    ReportModel.getWhere({ employeeId: userId, month }).then(setReports);
  }, [month]);

  return (
    <div className="flex flex-col mt-3">
      { userId && (
        <div className="flex items-center mb-5">
          <button
            className="rounded-full shadow hover:shadow-md bg-white p-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </button>
          <h1 className="text-xl ml-3 font-semibold">
            {state}
            <span className="font-light">&aposs Reports</span>
          </h1>
        </div>
      ) }

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
