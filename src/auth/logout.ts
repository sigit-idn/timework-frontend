export const logout = (): void => {
	fetch(process.env.REACT_APP_API_URL + "/auth/logout", {
		method: "POST",
		credentials: "include",
	}).then(() => {
		["role", "user"].forEach((key) => localStorage.removeItem(key));
		if (window.location.pathname !== "/login") {
			window.location.href = "/login";
		}
	});
};