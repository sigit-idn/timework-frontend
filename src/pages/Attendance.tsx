import React from "react";
import Loader from "../components/others/Loader";


const Attendances = React.lazy(() => import("../components/lists/Attendances"));

const Attendance: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Attendances />
    </React.Suspense>
  );
};

export default Attendance;
