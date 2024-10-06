import { HTTP } from '../../utils/enum';
import { ResponseVO } from '../../models/response.vo';
import { ERRORS } from '../constants/errors.constans';

export class BadRequestException extends Error {
	public readonly statusCode: number = HTTP.STATUS_CODE_400;

	public declare response: ResponseVO;

	constructor(public originDescription: string = '') {
		super();
		this.response = new ResponseVO(this.statusCode, ERRORS.BAD_REQUEST);
	}
}
