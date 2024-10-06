import { HTTP } from '../../utils/enum';
import { ResponseVO } from '../../models/response.vo';
import { ERRORS } from '../constants/errors.constans';

export class ResourceExistsException extends Error {
	public readonly statusCode: number = HTTP.STATUS_CODE_409;

	public declare response: ResponseVO;

	constructor(public originDescription: string, value: string) {
		super();
		this.response = new ResponseVO(this.statusCode, ERRORS.BAD_REQUEST_IS_IT_EXISTS(value));
	}
}
