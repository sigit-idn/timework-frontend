import { ArrowLeft } from "@geist-ui/react-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthFetch from "../../utils/authFetchHook";
import Report from "./Report";

const Reports = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const authFetch = useAuthFetch();
  const [userId, setUserId] = useState("");
  const [reports, setReports] = useState([]);
  const [month, setMonth] = useState(new Date().toLocaleDateString().replace(/(\d{4})[/-](\d{2}).*/, "$1-$2"));

  useEffect(() => {
    authFetch
      .get(`/reports?${userId ? "userId=" + userId + "&" : ""}month=` + month)
      .then((data: any) => {
        setReports(data);
      });
  }, [month]);

  return (
    <div className="flex flex-col mt-3">
      {userId ? (
        <div className="flex items-center mb-5">
          <button
            className="rounded-full shadow hover:shadow-md bg-white p-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </button>
          <h1 className="text-xl ml-3 font-semibold">
            {state}
            <span className="font-light">'s Reports</span>
          </h1>
        </div>
      ) : null}

      <label
        htmlFor="dateInput"
        className="px-3 border-b border-gray-300 bg-gray-50 text-left leading-4 font-medium text-gray-800 rounded-lg tracking-wider"
      >
        <input
          id="dateInput"
          onChange={({ target }: any) =>
            setMonth(target.value.replace(/(\d{4})[/-](\d{2}).*/, "$1-$2"))
          }
          className="border-0 bg-transparent text-sm"
          type="month"
          defaultValue={month}
        />
      </label>

      {reports
        ?.map((report: any, i: number) => (
          <Report setReports={setReports} report={report} key={i} />
        ))}
    </div>
  );
};

export default Reports;
