import { handleFetchResponse } from "../utils/handleFetchResponse"


interface ChildStatic<T extends BaseModel> {
	new (...args: any[]): T;
	resourcePath: string;
	fromJson(json: Record<string, keyof T>): T;
}

export abstract class BaseModel {
	protected static readonly baseUrl: string = process.env.REACT_APP_API_URL ?? "http://localhost:3000"
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
		params?: Record<string, string>,
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
		this: ChildStatic<T>
	): Promise<T[]> {
		const data = await BaseModel._fetch("GET", this.resourcePath)
		
		return data.map((item: Record<string, any>) => this.fromJson(item))
	}

	static async get<T extends BaseModel>(
		this: ChildStatic<T>,
		id: string
	): Promise<T> {
		const data = await BaseModel._fetch("GET", `${this.resourcePath}/${id}`)

		return this.fromJson(data)
	}

	static async getWhere<T extends BaseModel>(
		this: ChildStatic<T>,
		params: Record<string, string>
	): Promise<T[]> {
		const data = await BaseModel._fetch("GET", this.resourcePath, params)

		return data.map((item: Record<string, any>) => this.fromJson(item))
	}

	static async create<T extends BaseModel>(
		this: ChildStatic<T>,
		body: Record<string, any>
	): Promise<T> {
		const data = await BaseModel._fetch("POST", this.resourcePath, undefined, body)

		return this.fromJson(data)
	}

	static async update<T extends BaseModel>(
		this: ChildStatic<T>,
		id: string,
		body: Record<string, any>
	): Promise<T> {
		const data = await BaseModel._fetch("PUT", `${this.resourcePath}/${id}`, undefined, body)

		return this.fromJson(data)
	}

	static async delete<T extends BaseModel>(
		this: ChildStatic<T>,
		id: string
	): Promise<T> {
		const data = await BaseModel._fetch("DELETE", `${this.resourcePath}/${id}`)

		return this.fromJson(data)
	}
}