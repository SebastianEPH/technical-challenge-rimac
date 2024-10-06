export class Util {
	public static getTypeValue(value: unknown): string {
		if (Array.isArray(value)) {
			return 'array';
		}
		if (typeof value === 'number') {
			return 'number';
		}
		if (typeof value === 'string') {
			return 'string';
		}
		if (typeof value === 'object' && value !== null) {
			return 'object';
		}
		if (typeof value === 'boolean') {
			return 'boolean';
		}
		if (typeof value === 'undefined') {
			return 'undefined';
		}
		return 'unknown';
	}
}
