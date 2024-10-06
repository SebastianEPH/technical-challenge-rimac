import { inject, injectable, named } from 'inversify';
import { SwapiProvider } from '../swapi.provider';
import { TYPES } from '../../types';
import { TAG } from '../../tag';
import { ResponseProvider } from '../../interfaces/provider-response.interface';
import { ApiConnectorUtil } from '../../utils';
import { PeopleSwapiResponseEN, swapiResponse } from '../../interfaces/people-swapi-response.en.interface';

@injectable()
export class SwapiProviderImpl implements SwapiProvider {
	constructor(
		@inject(TYPES.ApiConnectorUtil)
		@named(TAG.SWAPI_PROD)
		private apiConnectorUtil: ApiConnectorUtil
	) {}

	public async searchPeople(word: string): Promise<ResponseProvider<swapiResponse<PeopleSwapiResponseEN>>> {
		const endpoint: string = `/api/people/?search=${word}`;
		const { statusCode, body }: ResponseProvider<swapiResponse<PeopleSwapiResponseEN>> = await this.apiConnectorUtil.get(endpoint);
		return { statusCode, body };
	}
}
