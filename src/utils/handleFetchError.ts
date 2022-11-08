export const handleFetchError = (error: any) => {
	if (error.status === 403) {
		window.location.href = "/login"
	}

	console.error(error)
}