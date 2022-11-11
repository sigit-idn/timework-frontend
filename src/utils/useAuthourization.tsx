import { useNavigate } from "react-router-dom";
import { Role        } from "../enums/role";
import { useSelector } from "react-redux";

export const useAuthorization = (): ((role: Role) => boolean) => {
  const redirect    = useNavigate();
  const currentRole = useSelector((state: any) => state.auth.role);

  return (role: Role) => {
    const roles = Object.values(Role);

    const isRoleValid = roles.indexOf(currentRole) >= roles.indexOf(role);

    if (!isRoleValid) {
      redirect("/login");
      sessionStorage.setItem("authError", "You are not authorized to access this page.");
    }

    return isRoleValid;
  };
};