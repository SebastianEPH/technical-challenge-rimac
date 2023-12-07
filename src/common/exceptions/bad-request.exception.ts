import { HTTP } from '../../utils/enum';
import ResponseVO from '../../models/response.vo';
import ERRORS from '../constants/errors.constans';

export default class BadRequestException extends Error {
	public statusCode: number = HTTP.STATUS_CODE_400;

	constructor(public origin: string = '', public originDescription: string = '') {
		super();
	}

	public response: ResponseVO = new ResponseVO(this.statusCode, ERRORS.BAD_REQUEST);
}
