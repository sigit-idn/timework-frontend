import React from "react"

import { Navigate         } from "react-router-dom";
import { Role             } from "../enums/role";
import { useAuthorization } from "../utils/useAuthourization";


const Guard: React.FC<{ role: Role }> = ({ role, children }) => {
  const authorize = useAuthorization();

	if (!authorize(role)) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
}

export default Guard;