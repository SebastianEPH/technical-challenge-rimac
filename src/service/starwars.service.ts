import CreateRequest from '../handler/request/create.request';
import { PeopleResponse } from '../interfaces/people-response.interface';
import RequestGetInterface from '../interfaces/request-get.interface';

export interface StarwarsService {
	create(createRequest: CreateRequest): Promise<PeopleResponse>;
	get(data: RequestGetInterface): Promise<any>;
}
