import { useLocation, useParams   } from "react-router-dom";
import React  from "react";
import Loader from "../../components/etc/Loader";

const ReportsList = React.lazy(() => import("../../components/lists/Reports"));


const EmployeeReports: React.FC = () => {
	const { employeeId } = useParams();
	const { state } = useLocation();

  return (
    <React.Suspense fallback={<Loader />}>
      <ReportsList employeeId={employeeId} state={state} />
    </React.Suspense>
  );
};

export default EmployeeReports;
