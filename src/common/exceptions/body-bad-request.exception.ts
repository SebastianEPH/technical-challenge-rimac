import { HTTP } from '../../utils/enum';
import ResponseVO from '../../models/response.vo';

export default class BodyBadRequestException extends Error {
	public statusCode: number = HTTP.STATUS_CODE_400;

	constructor(public origin: string = '', public originDescription: string = '', public error) {
		super();
	}

	public response: ResponseVO = new ResponseVO(this.statusCode, this.error);
}
