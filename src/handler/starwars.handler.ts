import { inject, injectable } from 'inversify';
import { APIGatewayEvent } from 'aws-lambda';
import { $log } from 'ts-log-debug';
import { StarwarsService } from '../service/starwars.service';
import TYPES from '../types';
import ResponseVO from '../models/response.vo';
import { HTTP, NAME, NAME_TYPE } from '../utils/enum';
import ErrorUtil from '../utils/error.util';

@injectable()
export default class StarwarsHandler {
	constructor(@inject(TYPES.StarWarsService) private tokenService: StarwarsService) {}

	async create(event: APIGatewayEvent): Promise<ResponseVO> {
		$log.info(NAME_TYPE.SERVICE + NAME.CREATE);
		try {
			const resposne = await this.tokenService.create(event);
			return new ResponseVO(HTTP.STATUS_CODE_201, resposne);
		} catch (e) {
			if (ErrorUtil.catch(e, NAME.CREATE)) return e.response;
			return ErrorUtil.error500(e, NAME.CREATE);
		}
	}

	async get(event: APIGatewayEvent): Promise<ResponseVO> {
		$log.info(NAME_TYPE.SERVICE + NAME.GET);
		try {
			const resposne = await this.tokenService.create(event);
			return new ResponseVO(HTTP.STATUS_CODE_200, resposne);
		} catch (e) {
			if (ErrorUtil.catch(e, NAME.GET)) return e.response;
			return ErrorUtil.error500(e, NAME.GET);
		}
	}
}
