import React from "react"
import { Role } from "../enums/role";

export default function Guard (role: Role): (Component: React.ReactNode) => React.ReactNode {
	
	return (Component: React.ReactNode): React.ReactNode => {
		const currentRole: Role = localStorage.getItem("role") as Role;
		const roles = Object.values(Role);
	
		console.log({role, currentRole, roles});
			if ( currentRole && roles.indexOf(currentRole) >= roles.indexOf(role)) {
				return Component;
			} 

			window.location.href = "/login";
		}
}