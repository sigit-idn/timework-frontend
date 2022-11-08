export abstract class BaseModel {
	protected static readonly baseUrl: string = process.env.REACT_APP_API_URL!
	public static resourcePath: string = ""
	protected static readonly options: RequestInit = {
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	}

	constructor(
		public id?: string
	) { }
	
	static async getAll<T extends BaseModel>(
		this: new (...args: any[]) => T
	): Promise<T[]> {
		const res = await fetch(`${BaseModel.baseUrl}/${(this as any).resourcePath}`, {
			...BaseModel.options,
			method: "GET",
		})
		return await res.json()
	}

	static async get<T extends BaseModel>(
		this: new (...args: any[]) => T, 
		id: string
	): Promise<T> {
		const res = await fetch(`${BaseModel.baseUrl}/${(this as any).resourcePath}/${id}`, {
			...BaseModel.options,
			method: "GET",
		})
		return await res.json()
	}

	static async getWhere<T extends BaseModel>(
		this: new (...args: any[]) => T, 
		{ ...params }: Record<string, any>
	): Promise<T[]> {
		const res = await fetch(`${BaseModel.baseUrl}/${(this as any).resourcePath}?${new URLSearchParams(params)}`, {
			...BaseModel.options,
			method: "GET",
		})
		return await res.json()
	}

	static async create<T extends BaseModel>(
		this: new (...args: any[]) => T,
		body: Record<string, any>
	): Promise<T> {
		const res = await fetch(`${BaseModel.baseUrl}/${(this as any).resourcePath}`, {
			...BaseModel.options,
			method: "POST",
			body: JSON.stringify(body)
		})
		return await res.json()
	}

	static async update<T extends BaseModel>(
		this: new (...args: any[]) => T,
		id: string,
		body: Record<string, any>
	): Promise<T> {
		const res = await fetch(`${BaseModel.baseUrl}/${(this as any).resourcePath}/${id}`, {
			...BaseModel.options,
			method: "PUT",
			body: JSON.stringify(body)
		})
		return await res.json()
	}

	static async delete<T extends BaseModel>(
		this: new (...args: any[]) => T,
		id: string
	): Promise<T> {
		const res = await fetch(`${BaseModel.baseUrl}/${(this as any).resourcePath}/${id}`, {
			...BaseModel.options,
			method: "DELETE",
		})
		return await res.json()
	}
}