import { $log } from 'ts-log-debug';
import ResponseVO from '../models/response.vo';
import { HTTP, NAME, NAME_TYPE } from './enum';
import ERRORS from '../common/constants/errors.constans';
import InternalServerErrorException from '../common/exceptions/Internal-server-error.exception';
import BadRequestException from '../common/exceptions/bad-request.exception';
import BodyBadRequestException from '../common/exceptions/body-bad-request.exception';
import NotFoundProviderException from '../common/exceptions/not-found-provider.exception';

export default class ErrorUtil {
	public static catch(e: Error, functionName: NAME): Error {
		if (e instanceof NotFoundProviderException || e instanceof BadRequestException || e instanceof BodyBadRequestException || e instanceof InternalServerErrorException) {
			$log.error(`${e.origin} ${functionName} | exception`, JSON.stringify(e));
			$log.error(`${e.origin} | ${e.originDescription} | Error`, JSON.stringify(e.response));
			return e;
		}
		return null;
	}

	public static error500({ name, message, stack }: Error, functionName: NAME): ResponseVO {
		const response: ResponseVO = new ResponseVO(HTTP.STATUS_CODE_500, ERRORS.INTERNAL_SERVER);
		$log.error(`${NAME_TYPE.SERVICE} ${functionName} | exception`, JSON.stringify({ name, message, stack }));
		$log.error(`${NAME_TYPE.SERVICE} ${functionName} | Error 500 Response: `, JSON.stringify(response));
		return response;
	}
}
