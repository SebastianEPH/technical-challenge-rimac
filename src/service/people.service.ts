import { CreateRequest } from '../handler/request/create.request';
import { PeopleSwapiResponseES } from '../interfaces';
import { GetParameters } from '../handler/parameters/get.parameters';

export interface PeopleService {
	create(createRequest: CreateRequest): Promise<PeopleSwapiResponseES>;
	getByName(getParameters: GetParameters): Promise<PeopleSwapiResponseES[]>;
}
