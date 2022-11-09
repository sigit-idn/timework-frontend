import { useNavigate } from "react-router-dom";
import { Role        } from "../enums/role";

export const useAuthorization = (): ((role: Role) => boolean) => {
  const redirect = useNavigate();

  return (role: Role) => {
    const roles = Object.values(Role);
    const isRoleValid = roles.indexOf(localStorage.role) >= roles.indexOf(role);

    if (!isRoleValid) {
      redirect("/login");
    }

    return isRoleValid;
  };
};