import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';

export interface DatabaseRepository {
	create(peopleDatabaseResponse222: PeopleDatabaseResponse): Promise<number>;
	getByName(name: string): Promise<PeopleDatabaseResponse[]>;
}
