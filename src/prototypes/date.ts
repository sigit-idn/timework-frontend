declare global {
	interface Date {
		format(format: string): string;
	}
}

Date.prototype.format = function(format: string): string {
	const map: Record<string, number> = {
		"m+": this.getMonth() + 1,                   // month
		"d+": this.getDate(),                        // day
		"h+": this.getHours(),                       // hour
		"i+": this.getMinutes(),                     // minute
		"s+": this.getSeconds(),                     // second
	};

	if (/(y+)/i.test(format)) {
		format = format.replace(
			/(y+)/i, 
			(match: string, p1: string) => (this.getFullYear() + "").substr(4 - p1.length)
		);
	}

	for (const k in map) {
		if (new RegExp("(" + k + ")", 'i').test(format)) {
			format = format.replace(
					new RegExp("(" + k + ")", 'i'), 
					(match: string, p1: string) => p1.length === 1 
						? map[k] + "" 
						: ("00" + map[k]).substr(("" + map[k]).length)
			);
		}
	}

	return format;
};

export {};