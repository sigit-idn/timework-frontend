import { useNavigate } from "react-router-dom";

const useAuthorization = () => {
  const redirect = useNavigate();
  return (role: string) => {
    const roles = ["employee", "admin", "superadmin"];

    if (roles.indexOf(localStorage.role) >= roles.indexOf(role)) return true;

    return redirect("/login");
  };
};

export default useAuthorization;
