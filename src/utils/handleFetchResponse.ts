export const handleFetchResponse = <T = any>(res: Response): Promise<T> => {
	const messages = {
		403: "You are not authorized to perform this action.",
		401: "You are not logged in or your session has expired.",
	}

	if (res.status === 401 || res.status === 403) {
		window.location.href = "/login"
		sessionStorage.setItem("authError", messages[res.status])
	}

	if (res.status >= 400) {
		throw res
	}

	return res.json()
}