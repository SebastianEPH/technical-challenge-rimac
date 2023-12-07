import { injectable } from 'inversify';
import { $log } from 'ts-log-debug';
import { DatabaseRepository } from '../database.repository';

@injectable()
export default class DatabaseRepositoryMysqlMockImpl implements DatabaseRepository {
	constructor() {}

	public async create(data: any): Promise<any> {
		$log.info(``);
		return { query: 'successfully', data };
	}
}
