import { useNavigate } from "react-router-dom"

const useAuthFetch = () => {
	const BASE_URL = "https://api-timework.herokuapp.com"
	const redirect = useNavigate()
	const innerFetch = (url: string, method: string, mimeType?: string, body?: object) =>
		new Promise(async (resolve, reject) => {
			const headers = {
				"Content-Type": `${mimeType}`,
				authorization: "Bearer " + localStorage?.token,
			}

			const options = body ? { body: JSON.stringify(body), method, headers } : { method, headers }

			const res = await fetch(BASE_URL + url, options)

			if (res.status !== 403) return resolve(await res.json())

			localStorage.clear()
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