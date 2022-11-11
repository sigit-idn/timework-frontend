import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Role                         } from "./enums/role";

import MainLayout         from "./components/layouts/MainLayout";
import Login              from "./pages/Login";
import Friends            from "./pages/Friends";
import Reports            from "./pages/Reports";
import Attendance         from "./pages/Attendance";
import EmployeeAttendance from "./pages/Friends/Attendance";
import AddEmployee        from "./pages/AddEmployee";
import EmployeeTask       from "./pages/Friends/Tasks";
import Home               from "./pages/Home";
import NotFound           from "./pages/NotFound";
import Guard              from "./router/Guard";
import EmployeeReports    from "./pages/Friends/Reports";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/">
            <Route path=""            element={<Guard role={Role.EMPLOYEE}><Home       /></Guard> } />
            <Route path="friends"     element={<Guard role={Role.EMPLOYEE}><Friends    /></Guard> } />
            <Route path="reports"     element={<Guard role={Role.EMPLOYEE}><Reports    /></Guard> } />
            <Route path="attendances" element={<Guard role={Role.EMPLOYEE}><Attendance /></Guard> } />
          </Route>

          <Route path="/friends/:employeeId/*">
            <Route path="tasks"       element={<Guard role={Role.EMPLOYEE}><EmployeeTask       /></Guard> } />
            <Route path="reports"     element={<Guard role={Role.EMPLOYEE}><EmployeeReports    /></Guard> } />
            <Route path="attendances" element={<Guard role={Role.EMPLOYEE}><EmployeeAttendance /></Guard> } />
          </Route>

          <Route path="friends/:employeeId/edit" element={<Guard role={Role.ADMIN}><AddEmployee /></Guard>} />
          <Route path="add-employee"             element={<Guard role={Role.ADMIN}><AddEmployee /></Guard>} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;