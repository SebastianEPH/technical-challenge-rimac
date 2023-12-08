import { Container } from 'inversify';
import TYPES from './types';
import { StarwarsService } from './service/starwars.service';
import StarwarsHandler from './handler/starwars.handler';
import { DatabaseRepository } from './repository/database.repository';
import DatabaseMysqlRepositoryImpl from './repository/implements/database.mysql.repository.impl'; /* USE DATABASE REAL */
// import DatabaseMockRepositoryImpl from "./repository/implements/database.mock.repository.impl"; /* USE DATABASE MOCK */
import ApiConnectorUtil from './utils/api-connector';
import { SwapiProvider } from './provider/swapi.provider';
import StarwarsServiceImpl from './service/implements/starwars.service.impl';
import DataMapper from './mapper/data.mapper';
import SwapiProviderImpl from './provider/impl/swapi.provider.impl';
import { ENV, HOST, TIMEOUT } from './utils/enum';
import TAG from './tag';
import ConfigDatabase from './interfaces/config-database.interface';
import { ConnectionMysqlDatabase } from './database/connections/implements/connection.mysql.database';
import { ConnectionDatabase } from './database/connection.database';

export const createContainer = (): Container => {
	const container: Container = new Container();

	const swapiApiConnector = new ApiConnectorUtil({
		host: HOST.SWAPI,
		timeout: TIMEOUT.PROVIDER,
	});

	const dbConfig: ConfigDatabase = {
		host: process.env[ENV.DATABASE_MYSQL_HOST],
		user: process.env[ENV.DATABASE_MYSQL_USER],
		password: process.env[ENV.DATABASE_MYSQL_PASSWORD],
		database: process.env[ENV.DATABASE_MYSQL_NAME],
	};
	const connectionMysqlDatabase: ConnectionMysqlDatabase = new ConnectionMysqlDatabase(dbConfig);
	container.bind<ConnectionDatabase>(TYPES.CoreClientDatabase).toConstantValue(connectionMysqlDatabase);
	container.bind<DatabaseRepository>(TYPES.DatabaseRepository).to(DatabaseMysqlRepositoryImpl); /* USE DATABASE REAL */
	// container.bind<DatabaseRepository>(TYPES.DatabaseRepository).to(DatabaseMockRepositoryImpl); /* USE DATABASE MOCK */
	container.bind<SwapiProvider>(TYPES.SwapiProvider).to(SwapiProviderImpl);
	container.bind<ApiConnectorUtil>(TYPES.ApiConnectorUtil).toConstantValue(swapiApiConnector).whenTargetNamed(TAG.SWAPI_PROD);
	container.bind<DataMapper>(TYPES.DataMapper).to(DataMapper);
	container.bind<StarwarsHandler>(TYPES.StarWarsHandler).to(StarwarsHandler);
	container.bind<StarwarsService>(TYPES.StarWarsService).to(StarwarsServiceImpl);

	return container;
};
