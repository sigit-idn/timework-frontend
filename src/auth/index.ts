import { EmployeeModel } from "../models/employee";

interface LoginInput {
	email: string;
	password: string;
}

export class Auth {
	private static _fetch(action: "login" | "logout", data?: LoginInput): Promise<{data: EmployeeModel}> {
		return fetch(process.env.REACT_APP_API_URL + "/auth/" + action, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: data ? JSON.stringify(data) : undefined
		}).then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error("Invalid credentials");
			}
		})
	}

	public static async login({ email, password }: LoginInput): Promise<EmployeeModel> {
		const { data } = await this._fetch("login", { email, password });
		localStorage.setItem("name", data.name);
		localStorage.setItem("role", data.role);
		return data;
	}

	public static logout(): Promise<void> {
		return this._fetch("logout").then(() => {
			["name", "role"].forEach((key) => localStorage.removeItem(key));
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		});
	}
}