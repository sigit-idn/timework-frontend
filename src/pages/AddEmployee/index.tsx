import React from "react";
import { EmployeeInput, EmployeeModel } from "../../models/employee";
import { useNavigate                  } from "react-router-dom";
import Employee from "../../components/forms/Employee";


const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const addEmployee = (employee: EmployeeInput) => {
    EmployeeModel.create(employee)
      .then(() => {
        navigate(-1);
      })
      .catch(console.error);
  };

  return (
    <Employee submit={addEmployee} />
  );
};

export default AddEmployee;