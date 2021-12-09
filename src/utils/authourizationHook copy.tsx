import { Navigate, useNavigate } from "react-router-dom";

const useAuthorization = (role: string) => {
  // const redirect = useNavigate();
  // return (role: string) => {
  const roles = ["employee", "admin", "superadmin"];

  if (roles.indexOf(localStorage.role) >= roles.indexOf(role)) return true;

  return <Navigate to="/login" />;
  // };
};

export default useAuthorization;
