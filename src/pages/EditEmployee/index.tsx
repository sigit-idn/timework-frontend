import React, { useEffect } from "react";
import { EmployeeInput, EmployeeModel        } from "../../models/employee";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Employee from "../../components/forms/Employee";


const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employeeId } = useParams();
  const [ employee, setEmployee ] = React.useState<EmployeeModel>();

  const updateEmployee = ({ id, ...employee }: EmployeeInput) => {
    EmployeeModel.update(id!, employee)
      .then(() => {
        navigate(-1);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (employeeId) {
      EmployeeModel.get(employeeId).then(setEmployee);
    }
  }, []);

  return (
    <Employee 
      submit={updateEmployee} 
      employee={employee} 
      state={state} 
    />
  );
};

export default EditEmployee;