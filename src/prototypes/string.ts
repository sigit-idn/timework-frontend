declare global {
	interface String {
		camelize<T = string>(): T;
		snakeize<T = string>(): T;
	}
}

String.prototype.camelize = function<T = string>(): T {
	return this
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
			index === 0 ? word.toLowerCase() : word.toUpperCase()
		))
		.replace(/\s+/g, "") as unknown as T;
};

String.prototype.snakeize = function<T = string>(): T {
	return this
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
			index === 0 ? word.toLowerCase() : "_" + word.toLowerCase()
		))
		.replace(/\s+/g, "") as unknown as T;
}

export {};
