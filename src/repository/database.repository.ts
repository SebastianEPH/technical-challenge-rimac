import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';
import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';

export interface DatabaseRepository {
	create(peopleResponse: PeopleSwapiResponse): Promise<any>;
	get(peopleResponse: any): Promise<PeopleDatabaseResponse[]>;
}
