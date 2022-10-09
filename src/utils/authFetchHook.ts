import { useNavigate } from "react-router-dom"

const useAuthFetch = () => {
	const BASE_URL = process.env.REACT_APP_API_URL
	const redirect = useNavigate()
	const innerFetch = (url: string, method: string, mimeType?: string, body?: object) =>
		new Promise(async (resolve) => {
			const headers = {
				"Content-Type": `${mimeType}`,
			}

			const res = await fetch(BASE_URL + url, {
				method,
				headers,
				body: JSON.stringify(body),
				credentials: "include",
			})

			if (res.status !== 403) return resolve(await res.json())

			redirect("/login")
		})

	return {
		get: (url: string) => innerFetch(url, "GET"),
		post: (url: string, body?: any) => innerFetch(url, "POST", "application/json", body),
		put: (url: string, body?: any) => innerFetch(url, "PUT", "application/json", body),
		delete: (url: string) => innerFetch(url, "DELETE")
	}
}

export default useAuthFetch