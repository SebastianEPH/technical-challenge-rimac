import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';

export interface DatabaseRepository {
	create(peopleResponse: PeopleSwapiResponse): Promise<any>;
}
