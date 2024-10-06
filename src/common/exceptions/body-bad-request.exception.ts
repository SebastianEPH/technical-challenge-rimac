import { HTTP } from '../../utils/enum';
import { ResponseVO } from '../../models/response.vo';

export class BodyBadRequestException extends Error {
	public readonly statusCode: number = HTTP.STATUS_CODE_400;

	public declare response: ResponseVO;

	constructor(public readonly originDescription: string, public readonly error: object) {
		super();
		this.response = new ResponseVO(this.statusCode, this.error);
	}
}
