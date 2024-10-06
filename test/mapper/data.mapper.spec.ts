import 'reflect-metadata';
import { DataMapper } from '../../src/mapper/data.mapper';
import { HTTP } from '../../src/utils/enum';

describe('DataMapper', () => {
	it('Should return the status code as an HTTP enum when it is a valid HTTP status code string', () => {
		expect(DataMapper.parseStatusCode('200')).toBe(HTTP.STATUS_CODE_200);
		expect(DataMapper.parseStatusCode('---')).toBe(HTTP.STATUS_CODE_500);
		expect(DataMapper.parseStatusCode('')).toBe(HTTP.STATUS_CODE_500);
		expect(DataMapper.parseStatusCode(undefined)).toBe(HTTP.STATUS_CODE_500);
		expect(DataMapper.parseStatusCode(null)).toBe(HTTP.STATUS_CODE_500);
		expect(DataMapper.parseStatusCode('404')).toBe(HTTP.STATUS_CODE_404);
		expect(DataMapper.parseStatusCode('400')).toBe(HTTP.STATUS_CODE_400);
		expect(DataMapper.parseStatusCode('500')).toBe(HTTP.STATUS_CODE_500);
		expect(DataMapper.parseStatusCode('***')).toBe(HTTP.STATUS_CODE_500);
		expect(DataMapper.parseStatusCode('401')).toBe(HTTP.STATUS_CODE_401);
		expect(DataMapper.parseStatusCode('987')).toBe(HTTP.STATUS_CODE_500);
	});
});
