export function resourcePath(path: string) {
	return function<T extends { new(...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			static resourcePath: string = path
		}
	}
}
