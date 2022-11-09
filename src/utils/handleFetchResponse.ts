export const handleFetchResponse = <T = any>(res: Response): Promise<T> => {
	if (res.status === 401 || res.status === 403) {
		window.location.href = "/login"
	}

	if (res.status >= 400) {
		throw res
	}

	return res.json()
}