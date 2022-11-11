import React from "react";
import { useParams   } from "react-router";
import { useLocation } from "react-router-dom";

import Loader from "../../components/etc/Loader";
const Tasks = React.lazy(() => import("../../components/lists/Tasks"));

const EmployeeTask: React.FC = () => {
  const { employeeId } = useParams();
  const { state } = useLocation();

  return (
    <React.Suspense fallback={<Loader />}>
      <Tasks employeeId={employeeId} state={state} />
    </React.Suspense>
  );
};

export default EmployeeTask;
