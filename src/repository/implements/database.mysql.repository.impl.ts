import { injectable, inject } from 'inversify';
import { $log } from 'ts-log-debug';
import { DatabaseRepository } from '../database.repository';
import { PeopleSwapiResponse } from '../../interfaces/people-swapi-response.interface';
import { NAME, NAME_TYPE } from '../../utils/enum';
import { ConnectionDatabase } from '../../database/connection.database';
import TYPES from '../../types';
import MysqlQueries from '../../database/queries/mysql.queries';
import { PeopleDatabaseResponse } from '../../interfaces/people-database-response.interface';

@injectable()
export default class DatabaseMysqlRepositoryImpl implements DatabaseRepository {
	constructor(@inject(TYPES.CoreClientDatabase) private coreClientDb: ConnectionDatabase) {}

	public async create(peopleResponse: PeopleSwapiResponse): Promise<void> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE);
		const query = MysqlQueries.create;
		const nuevaPersona = {
			name: 'NombrePersona',
			height: 'AlturaPersona',
			mass: 'PesoPersona',
			hair_color: 'ColorCabello',
			skin_color: 'ColorPiel',
			eye_color: 'ColorOjos',
			birth_year: 'AñoNacimiento',
			gender: 'Género',
			homeworld: 'PlanetaNatal',
			create: new Date(),
			edited: new Date(),
			url: 'URLPersona',
			created_at: new Date().toISOString(),
		};
		$log.info('nuevaPersona:   ', nuevaPersona);
		$log.info('peopleResponse: ', peopleResponse);

		const result = await this.coreClientDb.pool().query(query, nuevaPersona);
		console.log('Persona insertada. ID:', result);
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE, JSON.stringify({ query, params: nuevaPersona }));
	}

	public async get(peopleResponse: any): Promise<PeopleDatabaseResponse[]> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.GET);
		const query = MysqlQueries.get;
		const [result, gaaa] = await this.coreClientDb.pool().query(query);
		console.log('get | result:', result);
		console.log('get | gaaa:', gaaa);

		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.CREATE, JSON.stringify({ query, params: '' }));
		return result as PeopleDatabaseResponse[];
	}
}
