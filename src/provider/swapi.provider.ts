import { PeopleSwapiResponseEN, ResponseProvider, swapiResponse } from '../interfaces';

export interface SwapiProvider {
	searchPeople(word: string): Promise<ResponseProvider<swapiResponse<PeopleSwapiResponseEN>>>;
}
