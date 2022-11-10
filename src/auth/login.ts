interface LoginInput {
	email: string;
	password: string;
}

export const login = ({ email, password }: LoginInput): Promise<void> => {
	return fetch(process.env.REACT_APP_API_URL + "/auth/login", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ email, password })
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error("Invalid credentials");
		}
	}).then(({ data }) => {
		localStorage.setItem("role", data.role);
		localStorage.setItem("user", data.user);
	}).catch(console.error);
};