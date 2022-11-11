import React  from "react";
import Loader from "../../components/etc/Loader";
import { useSelector } from "react-redux";

const Tasks             = React.lazy(() => import("../../components/lists/Tasks"));
const AttendanceButtons = React.lazy(() => import("../../components/lists/AttendanceButtons"));


const Dashboard: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <>
      <h2 className="text-gray-700 font-bold text-3xl">
        {user}
      </h2>

      <React.Suspense fallback={<Loader />}>
        <AttendanceButtons />
        <Tasks />
      </React.Suspense>
    </>
  );
};

export default Dashboard;
