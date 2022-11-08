import { useNavigate } from "react-router-dom";
import { Role        } from "../enums/role";

export const useAuthorization = () => {
  const redirect = useNavigate();

  return (role: Role) => {
    const roles = Object.values(Role);

    if (roles.indexOf(localStorage.role) >= roles.indexOf(role)) {
      return true;
    }

    return redirect("/login");
  };
};