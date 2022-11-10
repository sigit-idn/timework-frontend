export class Duration {
		constructor(public milliseconds: number) {}

		public format(pattern: string): string {
			const map: Record<string, { value: number; modulator: number }> = {
				"y+": { value: this.years,   modulator : 12   },
				"m+": { value: this.months,  modulator : 30   },
				"d+": { value: this.days,    modulator : 24   },
				"h+": { value: this.hours,   modulator : 60   },
				"i+": { value: this.minutes, modulator : 60   },
				"s+": { value: this.seconds, modulator : 1000 },
			};

			for (const key in map) {
				if (new RegExp("(" + key + ")", "i").test(pattern)) {
					pattern = pattern.replace(
						new RegExp("(" + key + ")", "i"),
						(match, $1) => {
							const value = Math.floor(map[key].value % map[key].modulator);
							
							return String(value).padStart($1.length, "0");
						}
					);
				}
			}

			return pattern;
		}

		public get years(): number {
			return this.months / 12;
		}

		public get months(): number {
			return this.days / 30;
		}

		public get days(): number {
			return this.hours / 24;
		}

		public get hours(): number {
			return this.minutes / 60;
		}

		public get minutes(): number {
			return this.seconds / 60;
		}

		public get seconds(): number {
			return this.milliseconds / 1000;
		}
	}
