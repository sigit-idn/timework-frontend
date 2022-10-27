import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskContext } from "./config/contexts";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Friends from "./components/Friends";
import Reports from "./components/Reports/";
import Attendance from "./components/Attendance";
import AddEmployee from "./components/AddEmployee";
import EmployeeTask from "./components/EmployeeTasks";
import Dashboard from "./pages/Dashboard";

function App() {
  const [tasks, setTasks] = useState(useContext(TaskContext).tasks);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="friends" element={<Friends />} />
            <Route path="reports" element={<Reports />} />
            <Route path="attendances" element={<Attendance />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="friends/:id/tasks" element={<EmployeeTask />} />
            <Route path="friends/:id/edit" element={<AddEmployee />} />
            <Route path="friends/:id/reports" element={<Reports />} />
            <Route path="friends/:id/attendances" element={<Attendance />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TaskContext.Provider>
  );
}

export default App;
