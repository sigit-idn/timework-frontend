import React  from "react";
import Loader from "../components/others/Loader";

const Tasks       = React.lazy(() => import("../components/lists/Tasks"));
const Attendances = React.lazy(() => import("../components/lists/Attendances"));


const Dashboard: React.FC = () => {
  return (
    <>
      <h2 className="text-gray-700 font-bold text-3xl">
        {localStorage.getItem("name")}
      </h2>

      <React.Suspense fallback={<Loader />}>
        <Attendances />
      </React.Suspense>

      <React.Suspense fallback={<Loader />}>
        <h2 className="text-gray-700 text-3xl mt-7">Tasks</h2>
        <Tasks />
      </React.Suspense>
    </>
  );
};

export default Dashboard;
