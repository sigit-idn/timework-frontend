import React from "react"

import { Role             } from "../enums/role";
import { Navigate         } from "react-router-dom";
import { useAuthorization } from "../utils/authourizationHook";


export default function Guard({ role, children }: { role: Role, children: React.ReactNode }) {	
  const authorize = useAuthorization();

	if (!authorize(role)) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
}