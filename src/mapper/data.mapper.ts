import { $log } from 'ts-log-debug';
import { injectable } from 'inversify';
import { HEADERS, HTTP, NAME_TYPE } from '../utils/enum';

@injectable()
export default class DataMapper {
	// eslint-disable-next-line class-methods-use-this
	public async mapperr(data: any): Promise<any> {
		$log.info(` function `);
		return data;
	}

	public static parseStatusCode(status: string): HTTP {
		$log.info(`${NAME_TYPE.MAPPER} function parseStatusCode()`);
		if (!/^\d+$/.test(status)) return HTTP.STATUS_CODE_500;

		if (Object.values(HTTP).includes(Number(status) as HTTP)) return Number(status) as HTTP;
		$log.warn(`${NAME_TYPE.MAPPER} function parseStatusCode() | No status code found`);
		return HTTP.STATUS_CODE_500;
	}

	public static parseHeaders(headers: any): any {
		return {
			contentType: headers[HEADERS.CONTENT_TYPE] || HEADERS.CONTENT_TYPE.toLowerCase() || headers[HEADERS.CONTENT_TYPE.toUpperCase()],
			application: headers[HEADERS.APPLICATION] || HEADERS.APPLICATION.toLowerCase() || headers[HEADERS.APPLICATION.toUpperCase()],
			userAgent: headers[HEADERS.USER_AGENT] || HEADERS.USER_AGENT.toLowerCase() || headers[HEADERS.USER_AGENT.toUpperCase()],
		};
	}
}
