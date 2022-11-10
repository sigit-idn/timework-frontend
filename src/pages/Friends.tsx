import React, { Suspense } from "react";
import Loader from "../components/others/Loader";
const Employees = React.lazy(() => import("../components/lists/Employees"));


const Friends: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Employees />
    </Suspense>
  );
};

export default Friends;
