import { injectable, inject } from 'inversify';
import { $log } from 'ts-log-debug';
import { DatabaseRepository } from '../database.repository';
import { PeopleSwapiResponse } from '../../interfaces/people-swapi-response.interface';
import { NAME, NAME_TYPE } from '../../utils/enum';
import { ConnectionDatabase } from '../../database/connection.database';
import TYPES from '../../types';
import MySQL_QUERIES from '../../database/queries/mySQL_QUERIES';
import { PeopleDatabaseResponse } from '../../interfaces/people-database-response.interface';
import { DatabaseResult } from '../../interfaces/database-result.interface';
import GetParameters from '../../handler/parameters/get.parameters';
import DataMapper from '../../mapper/data.mapper';

@injectable()
export default class DatabaseMysqlRepositoryImpl implements DatabaseRepository {
	constructor(@inject(TYPES.CoreClientDatabase) private coreClientDb: ConnectionDatabase) {}

	public async create(peopleResponse: PeopleSwapiResponse): Promise<number> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE);
		const query = MySQL_QUERIES.CREATE;
		const peopleDatabaseResponse = DataMapper.parsePersonToSaveDatabase(peopleResponse);
		const [result] = await this.coreClientDb.pool().query(query, peopleDatabaseResponse);
		const id: number = (result as DatabaseResult).insertId;
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE, JSON.stringify({ query, params: peopleDatabaseResponse, result }));
		return id;
	}

	public async getByName(getParameters: GetParameters): Promise<PeopleDatabaseResponse[]> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.GET_BY_NAME);
		const query = MySQL_QUERIES.GET_BY_NAME;
		const params = [getParameters.name.toLowerCase()];

		const [result, gaaa] = await this.coreClientDb.pool().query(query, params); //
		console.log('\n\n\nget | result:', result);
		console.log('get | gaaa:', gaaa);

		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE, JSON.stringify({ query, params }));
		return result as PeopleDatabaseResponse[];
	}
}
