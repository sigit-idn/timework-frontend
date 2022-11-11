import React from "react";
import Loader from "../../components/etc/Loader";


const ReportsList = React.lazy(() => import("../../components/lists/Reports"));

const Reports: React.FC = () => {

  return (
    <React.Suspense fallback={<Loader />}>
      <ReportsList />
    </React.Suspense>
  );
};

export default Reports;
