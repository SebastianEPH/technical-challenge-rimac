import { injectable, inject } from 'inversify';
import { PeopleDatabaseRepository } from '../people.database.repository';
import { ConnectionDatabase } from '../../database/connection.database';
import { TYPES } from '../../types';
import { MySQL_QUERIES } from '../../database/queries/mysql.queries';
import { DatabaseResult, PeopleSwapiResponseEN } from '../../interfaces';
import { POSITION } from '../../utils/enum';

@injectable()
export class PeopleDatabaseMysqlRepositoryImpl implements PeopleDatabaseRepository {
	constructor(@inject(TYPES.CoreClientDatabase) private coreClientDb: ConnectionDatabase) {}

	public async create(peopleSwapiResponse: PeopleSwapiResponseEN): Promise<number> {
		const query = MySQL_QUERIES.CREATE;
		const [result] = await this.coreClientDb.pool().query(query, peopleSwapiResponse);
		const id: number = (<DatabaseResult>result).insertId;
		return id;
	}

	public async verifyIfExist(name: string): Promise<boolean> {
		const query = MySQL_QUERIES.VERIFY_IS_EXIST;
		const params = [name?.toLowerCase().trim()];
		const [result] = await this.coreClientDb.pool().query(query, params);
		return !!result[POSITION.SECOND];
	}

	public async getByName(name: string): Promise<PeopleSwapiResponseEN[]> {
		const query = MySQL_QUERIES.GET_BY_NAME;
		const params = [name?.toLowerCase()?.trim()];
		const [result] = await this.coreClientDb.pool().query(query, params);
		return <PeopleSwapiResponseEN[]>result;
	}
}
