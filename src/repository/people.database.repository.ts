import { PeopleSwapiResponseEN } from '../interfaces';

export interface PeopleDatabaseRepository {
	create(peopleSwapiResponse: PeopleSwapiResponseEN): Promise<number>;
	verifyIfExist(name: string): Promise<boolean>;
	getByName(name: string): Promise<PeopleSwapiResponseEN[]>;
}
