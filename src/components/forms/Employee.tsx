import React, { ChangeEvent, useState } from "react";
import { useNavigate                  } from "react-router-dom";
import { Role                         } from "../../enums/role";
import { EmployeeInput, EmployeeModel } from "../../models/employee";

import BackToFriendList from "../buttons/BackToFriendList";


interface EmployeeFormProps {
	employee?  : EmployeeModel;
	submit     : (employee: EmployeeInput) => void;
	state?     : { name: string};
	employeeId?: string;
}

const Employee: React.FC<EmployeeFormProps> = ({ employee, submit, state, employeeId }) => {
  const navigate = useNavigate();

  const [body, setBody] = useState<EmployeeInput>({...employee} as EmployeeInput);
  
  const inputChange = ({
    target: { name, value },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setBody({ ...body, [name]: value } as EmployeeInput);
  };

  const deleteEmployee = () => {
    if (!employeeId) return;

    if (!window.confirm("Are you sure to delete an employee?")) return;

    EmployeeModel.delete(employeeId).then(() => navigate(-1));
  };

  return (
    <div className="relative flex flex-col justify-center bg-center sm:px-3 lg:px-8 bg-no-repeat bg-cover">
      { state && <BackToFriendList name={state.name} /> }

      <div className="w-full space-y-8 p-6 md:p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">
                { state ? `Edit ${state.name}` : "Add new employee" }
              </h2>
            </div>
            <div className="mt-5">
              <form onSubmit={(e) => {
								e.preventDefault();
								submit(body);
							}}>
                <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="name"
                    >
                      Name <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="Name"
                      className="appearance-none block w-full text-grey-darker border-0 outline-none ring-1 ring-gray-200 focus:ring-indigo-500 rounded-lg h-10 px-4"
                      required
                      onChange={inputChange}
											value={body.name}
                      type="text"
                      name="name"
                      id="name"
                    />
                    <p className="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="email"
                    >
                      Email <abbr title="required">*</abbr>
                    </label>
                    <input
                      placeholder="Email"
                      className="appearance-none block w-full text-grey-darker border-0 outline-none ring-1 ring-gray-200 focus:ring-indigo-500 rounded-lg h-10 px-4"
                      required
                      onChange={inputChange}
											value={body.email}
                      type="email"
                      name="email"
                      id="email"
                    />
                    <p className="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="position"
                    >
                      Position<abbr title="required">*</abbr>
                    </label>
                    <select
                      className="block w-full text-grey-darker border-0 outline-none ring-1 ring-gray-200 focus:ring-indigo-500 rounded-lg h-10 px-4 md:w-full "
                      required
                      onChange={inputChange}
											value={body.position}
                      name="position"
                      id="position"
                    >
                      <option hidden value=""></option>
                      <option value="Back-End Engineer">
                        Back-End Engineer
                      </option>
                      <option value="Front-End Engineer">
                        Front-End Engineer
                      </option>
                      <option value="Data Engineer">Data Engineer</option>
                      <option value="UX Designer">UX Designer</option>
                      <option value="UX Writer">UX Writer</option>
                      <option value="UI Designer">UI Designer</option>
                    </select>
                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
                  </div>{" "}
                  <div className="w-full flex flex-col mb-3">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      placeholder="Phone Number"
                      className="appearance-none block w-full text-grey-darker border-0 outline-none ring-1 ring-gray-200 focus:ring-indigo-500 rounded-lg h-10 px-4"
                      type="text"
                      onChange={inputChange}
											value={body.phone}
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label
                      className=" font-semibold text-gray-600 py-2"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <select
                      onChange={inputChange}
                      id="role"
                      name="role"
                      className="block w-full flex-shrink flex-grow leading-normal flex-1 border-0 ring-1 ring-gray-200 focus:ring-indigo-500 h-10 rounded-lg px-3 relative"
                      placeholder="Role"
											value={body.role ?? Role.EMPLOYEE}
                    >
                      <option defaultChecked value="employee">
                        Employee
                      </option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full flex flex-col mb-3">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      placeholder="Password"
                      className="appearance-none block w-full text-grey-darker border-0 outline-none ring-1 ring-gray-200 focus:ring-indigo-500 rounded-lg h-10 px-4"
                      type="password"
                      onChange={inputChange}
											value={body.password}
                      name="password"
                      id="password"
                    />
                  </div>
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label
                    className="font-semibold text-gray-600 py-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    onChange={inputChange}
										value={body.address}
                    id="address"
                    name="address"
                    className="block w-full flex-shrink flex-grow leading-normal flex-1 border-0 ring-1 ring-gray-200 focus:ring-indigo-500 h-10 rounded-lg px-3 relative"
                    placeholder="Address"
                  />
                </div>
                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                  {employeeId && (
                    <button
                      type="button"
                      onClick={deleteEmployee}
                      className="mb-2 md:mb-0 bg-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded hover:shadow-lg hover:bg-red-600"
                    >
                      Delete Employee
                    </button>
                  )}
                  <button className="mb-2 md:mb-0 bg-indigo-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded hover:shadow-lg hover:bg-indigo-600">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
