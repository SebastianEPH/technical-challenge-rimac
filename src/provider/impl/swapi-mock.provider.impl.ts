import { injectable } from 'inversify';
import { $log } from 'ts-log-debug';
import { SwapiProvider } from '../swapi.provider';

@injectable()
export default class SwapiMockProviderImpl implements SwapiProvider {
	// eslint-disable-next-line class-methods-use-this
	public async get(data: any): Promise<any> {
		$log.info(``);
		return data;
	}
	public async post(data: any): Promise<any> {
		$log.info(``);
		return data;
	}
}
