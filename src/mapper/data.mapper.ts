import { injectable } from 'inversify';
import { HTTP } from '../utils/enum';

@injectable()
export class DataMapper {
	public static parseStatusCode(status: string): HTTP {
		if (!/^\d+$/.test(status)) return HTTP.STATUS_CODE_500;
		if (Object.values(HTTP).includes(Number(status) as HTTP)) return Number(status) as HTTP;
		return HTTP.STATUS_CODE_500;
	}
}
