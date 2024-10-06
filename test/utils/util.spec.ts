import { Util } from '../../src/utils/util';

describe('Util getTypeValue', () => {
	it('should return "array" for arrays', () => {
		expect(Util.getTypeValue([1, 2, 3])).toBe('array');
		expect(Util.getTypeValue([])).toBe('array');
	});
	it('should return "number" for numbers', () => {
		expect(Util.getTypeValue(123)).toBe('number');
		expect(Util.getTypeValue(0)).toBe('number');
		expect(Util.getTypeValue(-10)).toBe('number');
		expect(Util.getTypeValue(NaN)).toBe('number');
	});
	it('should return "string" for strings', () => {
		expect(Util.getTypeValue('hello')).toBe('string');
		expect(Util.getTypeValue('')).toBe('string');
	});
	it('should return "object" for objects', () => {
		expect(Util.getTypeValue({ key: 'value' })).toBe('object');
		expect(Util.getTypeValue({})).toBe('object');
		expect(Util.getTypeValue(null)).not.toBe('object');
	});
	it('should return "boolean" for booleans', () => {
		expect(Util.getTypeValue(true)).toBe('boolean');
		expect(Util.getTypeValue(false)).toBe('boolean');
	});
	it('should return "undefined" for undefined', () => {
		expect(Util.getTypeValue(undefined)).toBe('undefined');
	});
	it('should return "unknown" for null', () => {
		expect(Util.getTypeValue(null)).toBe('unknown');
	});
	it('should return "unknown" for other types', () => {
		expect(Util.getTypeValue(Symbol('sym'))).toBe('unknown');
	});
});
