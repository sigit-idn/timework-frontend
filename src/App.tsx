import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Friends from "./components/Friends";
import Reports from "./components/Reports/";
import Attendance from "./components/Attendance";
import AddEmployee from "./components/AddEmployee";
import EmployeeTask from "./components/EmployeeTasks";
import Dashboard from "./pages/Dashboard";
import { TaskContext } from "./config/contexts";

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
            <Route path="friends/tasks/:id" element={<EmployeeTask />} />
            <Route path="friends/edit/:id" element={<AddEmployee />} />
            <Route path="friends/reports/:id" element={<Reports />} />
            <Route path="friends/attendances/:id" element={<Attendance />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TaskContext.Provider>
  );
}

export default App;
