import { inject, injectable } from 'inversify';
import { APIGatewayEvent } from 'aws-lambda';
import { PeopleService } from '../service/people.service';
import { TYPES } from '../types';
import { ResponseVO } from '../models/response.vo';
import { HTTP } from '../utils/enum';
import { ErrorUtil } from '../utils/error.util';
import { CreateRequest } from './request/create.request';
import { GetParameters } from './parameters/get.parameters';

@injectable()
export class StarwarsHandler {
	constructor(@inject(TYPES.StarWarsService) private tokenService: PeopleService) {}

	async create(event: APIGatewayEvent): Promise<ResponseVO> {
		try {
			const body = JSON.parse(event?.body || '{}');
			const createRequest: CreateRequest = new CreateRequest(body);
			const response = await this.tokenService.create(createRequest);
			return new ResponseVO(HTTP.STATUS_CODE_201, response);
		} catch (e) {
			if (ErrorUtil.catch(e)) return e.response;
			return ErrorUtil.error500(e);
		}
	}

	async get(event: APIGatewayEvent): Promise<ResponseVO> {
		try {
			const getParameters: GetParameters = new GetParameters((event.queryStringParameters as any) || {});
			const response = await this.tokenService.getByName(getParameters);
			return new ResponseVO(HTTP.STATUS_CODE_200, response);
		} catch (e) {
			if (ErrorUtil.catch(e)) return e.response;
			return ErrorUtil.error500(e);
		}
	}
}
