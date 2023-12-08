import { inject, injectable } from 'inversify';
import { APIGatewayEvent } from 'aws-lambda';
import { $log } from 'ts-log-debug';
import { StarwarsService } from '../service/starwars.service';
import TYPES from '../types';
import ResponseVO from '../models/response.vo';
import { HTTP, NAME, NAME_TYPE } from '../utils/enum';
import ErrorUtil from '../utils/error.util';
import CreateRequest from './request/create.request';
import GetParameters from './parameters/get.parameters';

@injectable()
export default class StarwarsHandler {
	constructor(@inject(TYPES.StarWarsService) private tokenService: StarwarsService) {}

	async create(event: APIGatewayEvent): Promise<ResponseVO> {
		$log.info(NAME_TYPE.HANDLER + NAME.CREATE);
		try {
			const body = JSON.parse(event?.body);
			const createRequest: CreateRequest = new CreateRequest(body);
			const resposne = await this.tokenService.create(createRequest);
			return new ResponseVO(HTTP.STATUS_CODE_201, resposne);
		} catch (e) {
			if (ErrorUtil.catch(e, NAME.CREATE)) return e.response;
			return ErrorUtil.error500(e, NAME.CREATE);
		}
	}

	async get(event: APIGatewayEvent): Promise<ResponseVO> {
		$log.info(NAME_TYPE.HANDLER + NAME.GET_BY_NAME);
		try {
			console.log('event.queryStringParameters', event.queryStringParameters);
			const getParameters: GetParameters = new GetParameters(event.queryStringParameters as any);
			const resposne = await this.tokenService.getByName(getParameters);
			return new ResponseVO(HTTP.STATUS_CODE_200, resposne);
		} catch (e) {
			if (ErrorUtil.catch(e, NAME.GET_BY_NAME)) return e.response;
			return ErrorUtil.error500(e, NAME.GET_BY_NAME);
		}
	}
}
