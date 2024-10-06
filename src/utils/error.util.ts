import { $log } from 'ts-log-debug';
import { ResponseVO } from '../models/response.vo';
import { HTTP } from './enum';
import { ERRORS } from '../common/constants/errors.constans';
import { BadRequestException, BodyBadRequestException, InternalServerErrorException, NotFoundProviderException, ResourceExistsException } from '../common/exceptions';

export class ErrorUtil {
	public static catch(e: Error): Error {
		if (
			e instanceof NotFoundProviderException ||
			e instanceof BadRequestException ||
			e instanceof BodyBadRequestException ||
			e instanceof ResourceExistsException ||
			e instanceof InternalServerErrorException
		) {
			$log.error(`${e.originDescription} | Error`, JSON.stringify(e.response));
			return e;
		}
		return null;
	}

	public static error500({ name, message, stack }: Error): ResponseVO {
		const response: ResponseVO = new ResponseVO(HTTP.STATUS_CODE_500, ERRORS.INTERNAL_SERVER);
		$log.error(`exception`, JSON.stringify({ name, message, stack }));

		$log.error(`Error 500 Response: `, JSON.stringify(response));
		return response;
	}
}
