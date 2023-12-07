import { HTTP } from '../utils/enum';
import { READERS_RESPONSE } from '../utils/constants';

export default class ResponseVO {
	headers: object;

	constructor(public statusCode: HTTP, public body: string | object) {
		this.headers = READERS_RESPONSE;
		this.body = JSON.stringify(body);
	}
}
