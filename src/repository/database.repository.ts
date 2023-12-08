import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';
import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';
import GetParameters from '../handler/parameters/get.parameters';

export interface DatabaseRepository {
	create(peopleResponse: PeopleSwapiResponse): Promise<any>;
	getByName(peopleResponse: GetParameters): Promise<PeopleDatabaseResponse[]>;
}
