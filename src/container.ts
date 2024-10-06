import { Container } from 'inversify';
import { TYPES } from './types';
import { PeopleService } from './service/people.service';
import { StarwarsHandler } from './handler/starwars.handler';
import { PeopleDatabaseRepository } from './repository/people.database.repository';
import { PeopleDatabaseMysqlRepositoryImpl } from './repository/implements/people.database.mysql.repository.impl'; /* USE DATABASE REAL */
import { SwapiProvider } from './provider/swapi.provider';
import { PeopleServiceImpl } from './service/implements/people.service.impl';
import { DataMapper } from './mapper/data.mapper';
import { SwapiProviderImpl } from './provider/impl/swapi.provider.impl';
import { ENV, HOST, TIMEOUT } from './utils/enum';
import { TAG } from './tag';
import { ConfigDatabase } from './interfaces';
import { ConnectionMysqlDatabase } from './database/connections/implements/connection.mysql.database';
import { ConnectionDatabase } from './database/connection.database';
import { ApiConnectorUtil } from './utils';

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
	container.bind<PeopleDatabaseRepository>(TYPES.DatabaseRepository).to(PeopleDatabaseMysqlRepositoryImpl);
	container.bind<SwapiProvider>(TYPES.SwapiProvider).to(SwapiProviderImpl);
	container.bind<ApiConnectorUtil>(TYPES.ApiConnectorUtil).toConstantValue(swapiApiConnector).whenTargetNamed(TAG.SWAPI_PROD);
	container.bind<DataMapper>(TYPES.DataMapper).to(DataMapper);
	container.bind<StarwarsHandler>(TYPES.StarWarsHandler).to(StarwarsHandler);
	container.bind<PeopleService>(TYPES.StarWarsService).to(PeopleServiceImpl);
	return container;
};
