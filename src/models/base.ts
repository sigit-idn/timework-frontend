import { handleFetchResponse } from "../utils/handleFetchResponse"


interface ChildClass<T extends BaseModel> {
	new (...args: any[]): T;                    // constructor
	resourcePath: string;                       // static property
	fromJson(json: Record<string, keyof T>): T; // static method
}

export abstract class BaseModel {
	protected static async _fetch(
		method: "GET" | "POST" | "PUT" | "DELETE",
		path: string,
		params?: Record<string, string>,
		body?: Record<string, any>
	): Promise<Record<string, any>> {
		const url = new URL(`${process.env.REACT_APP_API_URL}/${path}`)

		if (params) {
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
		}

		const res = await fetch(url.toString(), {
			method,
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: body ? JSON.stringify(body) : undefined
		})

		return handleFetchResponse(res)
	}
	
	static async getAll<T extends BaseModel>(
		this: ChildClass<T>
	): Promise<T[]> {
		const data = await BaseModel._fetch("GET", this.resourcePath)
		
		return data.map((item: Record<string, any>) => this.fromJson(item))
	}

	static async get<T extends BaseModel>(
		this: ChildClass<T>,
		id: string
	): Promise<T> {
		const data = await BaseModel._fetch("GET", `${this.resourcePath}/${id}`)

		return this.fromJson(data)
	}

	static async getWhere<T extends BaseModel>(
		this: ChildClass<T>,
		params: Record<string, string>
	): Promise<T[]> {
		const data = await BaseModel._fetch("GET", this.resourcePath, params)

		return data.map((item: Record<string, any>) => this.fromJson(item))
	}

	static async create<T extends BaseModel>(
		this: ChildClass<T>,
		body: Record<string, any>
	): Promise<T> {
		const data = await BaseModel._fetch("POST", this.resourcePath, undefined, body)

		return this.fromJson(data)
	}

	static async update<T extends BaseModel>(
		this: ChildClass<T>,
		id: string,
		body: Record<string, any>
	): Promise<T> {
		const data = await BaseModel._fetch("PUT", `${this.resourcePath}/${id}`, undefined, body)

		return this.fromJson(data)
	}

	static async delete<T extends BaseModel>(
		this: ChildClass<T>,
		id: string
	): Promise<T> {
		const data = await BaseModel._fetch("DELETE", `${this.resourcePath}/${id}`)

		return this.fromJson(data)
	}
}