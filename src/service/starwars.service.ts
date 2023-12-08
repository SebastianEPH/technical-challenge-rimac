import CreateRequest from '../handler/request/create.request';
import { PeopleResponse } from '../interfaces/people-response.interface';
import GetParameters from '../handler/parameters/get.parameters';

export interface StarwarsService {
	create(createRequest: CreateRequest): Promise<PeopleResponse>;
	getByName(getParameters: GetParameters): Promise<PeopleResponse[]>;
}
