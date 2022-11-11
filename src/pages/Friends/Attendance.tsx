import { useLocation, useParams     } from "react-router-dom";
import React  from "react";
import Loader from "../../components/etc/Loader";

const Attendances = React.lazy(() => import("../../components/lists/Attendances"));


const EmployeeAttendance: React.FC = () => {
	const { employeeId } = useParams();
	const { state } = useLocation();

  return (
    <React.Suspense fallback={<Loader />}>
      <Attendances employeeId={employeeId} state={state} />
    </React.Suspense>
  );
};

export default EmployeeAttendance;