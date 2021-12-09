import { ArrowLeft } from "@geist-ui/react-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthFetch from "../../utils/authFetchHook";
import Report from "./Report";

const Reports = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const userId = pathname.match(/\w{24}/);
  const authFetch = useAuthFetch();
  const [reports, setReports] = useState([]);
  const [month, setMonth] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    authFetch
      .get(`/v1/report?${userId ? "userId=" + userId + "&" : ""}month=` + month)
      .then((res: any) => {
        const { data } = res;

        setReports(
          data.sort((a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime() < 0 ? 1 : -1
          )
        );
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
            setMonth(new Date(target.value).toLocaleDateString())
          }
          className="border-0 bg-transparent text-sm"
          type="month"
          defaultValue={
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1 < 10
              ? "0" + new Date().getMonth() + 1
              : new Date().getMonth() + 1)
          }
        />
      </label>

      {reports
        ?.sort((a: any, b: any) =>
          new Date(a.date) < new Date(b.date) ? 1 : -1
        )
        .map((report: any, i: number) => (
          <Report setReports={setReports} report={report} key={i} />
        ))}
    </div>
  );
};

export default Reports;
