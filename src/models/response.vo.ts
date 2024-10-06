import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { HTTP } from '../utils/enum';
import { READERS_RESPONSE } from '../utils/constants';

export class ResponseVO implements APIGatewayProxyStructuredResultV2 {
	public declare statusCode: HTTP;

	public declare body: string;

	public declare isBase64Encoded?: boolean | undefined;

	public declare cookies?: string[] | undefined;

	public declare headers: { [header: string]: boolean | number | string };

	constructor(statusCode: HTTP, body: object, headers?: object) {
		this.statusCode = statusCode;
		this.body = JSON.stringify(body);
		this.headers = {
			...READERS_RESPONSE,
			...headers,
		};
	}
}
