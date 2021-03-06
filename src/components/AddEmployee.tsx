import { ArrowLeft } from "@geist-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthFetch from "../utils/authFetchHook";
import useAuthorization from "../utils/authourizationHook";

const AddEmployee = () => {
  const navigate = useNavigate();
  const authorize = useAuthorization();
  const { pathname, state } = useLocation();
  const userId = pathname.match(/\w{24}/)?.[0];

  interface UserData {
    name?: string;
    email?: string;
    position?: string;
    phone?: string;
    role?: "employee" | "admin" | "superadmin";
    password?: string;
    address?: string;
    bio?: string;
  }

  const [userData, setUserData] = useState<UserData>({});

  authorize("admin");
  const authFetch = useAuthFetch();
  const [body, setBody] = useState({});

  const inputChange = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setBody({ ...body, [target.name]: target.value });
  };

  useEffect(
    (): any =>
      authFetch
        .get("/v1/employee/" + userId)
        .then((res: any) => setUserData(res.data)),
    []
  );

  const saveEmployee = (event: any) => {
    event.preventDefault();

    if (userId) {
      return authFetch
        .put("/v1/employee/" + userId, body)
        .then((res) => console.log(res));
    } else {
      authFetch.post("/v1/employee", body).then((res) => console.log(res));
    }
  };

  const deleteEmployee = () => {
    if (window.confirm("Are you sure to delete an employee?"))
      authFetch.delete("/v1/employee/" + userId).then(() => navigate(-1));
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-center sm:px-3 lg:px-8 bg-no-repeat bg-cover">
      {userId ? (
        <div className="flex items-center mb-5">
          <button
            className="rounded-full shadow hover:shadow-md bg-white p-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </button>
          <h1 className="text-xl ml-3 font-semibold">
            <span className="font-light">Edit </span>
            {state}
          </h1>
        </div>
      ) : null}
      <div className="w-full space-y-8 p-6 md:p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">
                {userId ? null : "Add Employee"}
              </h2>
            </div>
            <div className="mt-5">
              <form onSubmit={saveEmployee}>
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
                      defaultValue={userData.name}
                      onChange={inputChange}
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
                      defaultValue={userData.email}
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
                      defaultValue={userData.position}
                      onChange={inputChange}
                      name="position"
                      id="position"
                    >
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
                      defaultValue={userData.phone}
                      onChange={inputChange}
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
                      defaultValue={userData.role ?? "employee"}
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
                    id="address"
                    defaultValue={userData.address}
                    name="address"
                    className="block w-full flex-shrink flex-grow leading-normal flex-1 border-0 ring-1 ring-gray-200 focus:ring-indigo-500 h-10 rounded-lg px-3 relative"
                    placeholder="Address"
                  />
                </div>
                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                  <label
                    className="font-semibold text-gray-600 py-2"
                    htmlFor="bio"
                  >
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    onChange={inputChange}
                    className="min-h-[100px] max-h-[300px] h-28 appearance-none block w-full text-grey-darker border-0 outline-none ring-1 ring-gray-200 focus:ring-indigo-500 rounded-lg  py-4 px-4"
                    placeholder="Additional information"
                  ></textarea>
                </div>
                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                  {userId ? (
                    <button
                      type="button"
                      onClick={deleteEmployee}
                      className="mb-2 md:mb-0 bg-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded hover:shadow-lg hover:bg-red-600"
                    >
                      Delete Employee
                    </button>
                  ) : null}
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

export default AddEmployee;
