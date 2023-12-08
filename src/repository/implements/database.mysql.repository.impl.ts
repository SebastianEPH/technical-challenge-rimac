import { injectable, inject } from 'inversify';
import { $log } from 'ts-log-debug';
import { DatabaseRepository } from '../database.repository';
import { NAME, NAME_TYPE } from '../../utils/enum';
import { ConnectionDatabase } from '../../database/connection.database';
import TYPES from '../../types';
import MySQL_QUERIES from '../../database/queries/mysql.queries';
import { PeopleDatabaseResponse } from '../../interfaces/people-database-response.interface';
import { DatabaseResult } from '../../interfaces/database-result.interface';

@injectable()
export default class DatabaseMysqlRepositoryImpl implements DatabaseRepository {
	constructor(@inject(TYPES.CoreClientDatabase) private coreClientDb: ConnectionDatabase) {}

	public async create(peopleDatabaseResponse: PeopleDatabaseResponse): Promise<number> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE);
		const query = MySQL_QUERIES.CREATE;
		const [result] = await this.coreClientDb.pool().query(query, peopleDatabaseResponse);
		const id: number = (result as DatabaseResult).insertId;
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE, JSON.stringify({ query, params: peopleDatabaseResponse, result }));
		return id;
	}

	public async getByName(name: string): Promise<PeopleDatabaseResponse[]> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.GET_BY_NAME);
		const query = MySQL_QUERIES.GET_BY_NAME;
		const params = [name.toLowerCase().trim()];
		const [result] = await this.coreClientDb.pool().query(query, params);
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE, JSON.stringify({ query, params }));
		return result as PeopleDatabaseResponse[];
	}
}
