import { inject, injectable, named } from 'inversify';
import { $log } from 'ts-log-debug';
import { SwapiProvider } from '../swapi.provider';
import TYPES from '../../types';
import TAG from '../../tag';
import ApiConnectorUtil from '../../utils/api-connector';
import { HOST, NAME, NAME_TYPE } from '../../utils/enum';
import ResponseProvider from '../../interfaces/provider-response.interface';

@injectable()
export default class SwapiProviderImpl implements SwapiProvider {
	constructor(
		@inject(TYPES.ApiConnectorUtil)
		@named(TAG.SWAPI_PROD)
		private ApiConnectorUtil: ApiConnectorUtil
	) {}

	public async search(word: string): Promise<ResponseProvider> {
		$log.info(`${NAME_TYPE.PROVIDER + NAME.GET_BY_NAME}`);
		$log.info(`${NAME_TYPE.PROVIDER + NAME.GET_BY_NAME} Request: `, JSON.stringify({}));
		const endpoint: string = `/api/people/?search=${word}`;
		$log.info(`${NAME_TYPE.PROVIDER + NAME.GET_BY_NAME} endpoint: ${HOST.SWAPI + endpoint}`);
		const { statusCode, body } = await this.ApiConnectorUtil.get(endpoint);
		$log.debug(`${NAME_TYPE.PROVIDER + NAME.GET_BY_NAME} Response: `, JSON.stringify({ statusCode, body }));
		return { statusCode, body };
	}
}
