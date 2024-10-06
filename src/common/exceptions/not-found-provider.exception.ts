import { HTTP } from '../../utils/enum';
import { ERRORS } from '../constants/errors.constans';
import { ResponseVO } from '../../models/response.vo';

export class NotFoundProviderException extends Error {
	public readonly statusCode: number = HTTP.STATUS_CODE_404;

	public declare response: ResponseVO;

	constructor(public originDescription: string = '') {
		super();
		this.response = new ResponseVO(this.statusCode, ERRORS.NOT_FOUND_FROM_PROVIDER);
	}
}
