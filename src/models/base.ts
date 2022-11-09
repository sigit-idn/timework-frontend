import { handleFetchResponse } from "../utils/handleFetchResponse"


export abstract class BaseModel {
	protected static readonly baseUrl: string = process.env.REACT_APP_API_URL ?? "http://localhost:3000"
	protected static resourcePath: string;
	protected static fromJson: (json: Record<string, any>) => Record<string, any>
	protected static readonly options: RequestInit = {
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	}

	constructor(
		public id: string = "",
	) { }

	protected static async _fetch(
		method: "GET" | "POST" | "PUT" | "DELETE",
		path: string,
		params?: Record<string, any>,
		body?: Record<string, any>
	): Promise<Record<string, any>> {
		const url = new URL(`${BaseModel.baseUrl}/${path}`)

		if (params) {
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		}

		const res = await fetch(url.toString(), {
			...BaseModel.options,
			method,
			body: body ? JSON.stringify(body) : undefined
		})

		return handleFetchResponse(res)
	}
	
	static async getAll<T extends BaseModel>(
		this: new (...args: any[]) => T
	): Promise<T[]> {
		const data = await BaseModel._fetch("GET", (this as any).resourcePath)
		
		const items = data.map((item: Record<string, any>) => (this as any).fromJson(item))
		
		return items
	}

	static async get<T extends BaseModel>(
		this: new (...args: any[]) => T, 
		id: string
	): Promise<T> {
		const data = await BaseModel._fetch("GET", `${(this as any).resourcePath}/${id}`)

		return (this as any).fromJson(data)
	}

	static async getWhere<T extends BaseModel>(
		this: new (...args: any[]) => T, 
		{ ...params }: Record<string, any>
	): Promise<T[]> {
		const data = await BaseModel._fetch("GET", (this as any).resourcePath, params)

		return data.map((item: Record<string, any>) => (this as any).fromJson(item))
	}

	static async create<T extends BaseModel>(
		this: new (...args: any[]) => T,
		body: Record<string, any>
	): Promise<T> {
		const data = await BaseModel._fetch("POST", (this as any).resourcePath, undefined, body)

		return (this as any).fromJson(data)
	}

	static async update<T extends BaseModel>(
		this: new (...args: any[]) => T,
		id: string,
		body: Record<string, any>
	): Promise<T> {
		const data = await BaseModel._fetch("PUT", `${(this as any).resourcePath}/${id}`, undefined, body)

		return (this as any).fromJson(data)
	}

	static async delete<T extends BaseModel>(
		this: new (...args: any[]) => T,
		id: string
	): Promise<T> {
		const data = await BaseModel._fetch("DELETE", `${(this as any).resourcePath}/${id}`)

		return (this as any).fromJson(data)
	}
}