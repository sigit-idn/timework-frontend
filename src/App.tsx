import React, { useState              } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkingTaskContext           } from "./config/contexts";
import { TaskModel                    } from "./models/task";
import { Role                         } from "./enums/role";

import MainLayout   from "./components/layouts/MainLayout";
import Login        from "./pages/Login";
import Friends      from "./pages/Friends";
import Reports      from "./pages/Reports";
import Attendance   from "./pages/Attendance";
import AddEmployee  from "./pages/AddEmployee";
import EmployeeTask from "./pages/EmployeeTasks";
import Dashboard    from "./pages/Dashboard";
import NotFound     from "./pages/NotFound";
import Guard        from "./router/Guard";

const App: React.FC = () => {
  const [workingTask, setWorkingTask] = useState<TaskModel>();

  return (
    <WorkingTaskContext.Provider value={{ workingTask, setWorkingTask }}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/">
              <Route path=""            element={<Guard role={Role.EMPLOYEE}><Dashboard /></Guard> } />
              <Route path="friends"     element={<Guard role={Role.EMPLOYEE}><Friends /></Guard>   } />
              <Route path="reports"     element={<Guard role={Role.EMPLOYEE}><Reports /></Guard>   } />
              <Route path="attendances" element={<Guard role={Role.EMPLOYEE}><Attendance /></Guard>} />
            </Route>

            <Route path="/friends/:employeeId/*">
              <Route path="tasks"       element={<Guard role={Role.EMPLOYEE}><EmployeeTask /></Guard>} />
              <Route path="reports"     element={<Guard role={Role.EMPLOYEE}><Reports /></Guard>     } />
              <Route path="attendances" element={<Guard role={Role.EMPLOYEE}><Attendance /></Guard>  } />
            </Route>

            <Route path="friends/:employeeId/edit" element={<Guard role={Role.ADMIN}><AddEmployee /></Guard>} />
            <Route path="add-employee"             element={<Guard role={Role.ADMIN}><AddEmployee /></Guard>} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </MainLayout>
      </BrowserRouter>
    </WorkingTaskContext.Provider>
  );
}

export default App;