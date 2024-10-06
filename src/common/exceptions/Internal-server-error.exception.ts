import { HTTP } from '../../utils/enum';
import { ResponseVO } from '../../models/response.vo';
import { ERRORS } from '../constants/errors.constans';

export class InternalServerErrorException extends Error {
	public readonly statusCode: number = HTTP.STATUS_CODE_500;

	public declare response: ResponseVO;

	constructor(public originDescription: string = '') {
		super();
		this.response = new ResponseVO(this.statusCode, ERRORS.INTERNAL_SERVER);
	}
}
