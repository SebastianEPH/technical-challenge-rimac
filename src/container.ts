import { Container } from 'inversify';
import TYPES from './types';
import { StarwarsService } from './service/starwars.service';
import StarwarsHandler from './handler/starwars.handler';
import { DatabaseRepository } from './repository/database.repository';
import DatabaseRepositoryMysqlMockImpl from './repository/implements/database.repository-mysql.mock.impl';
import ApiConnectorUtil from './utils/api-connector';
import { SwapiProvider } from './provider/swapi.provider';
import StarwarsServiceImpl from './service/implements/starwars.service.impl';
import DataMapper from './mapper/data.mapper';
import SwapiMockProviderImpl from './provider/impl/swapi-mock.provider.impl';
import { HOST, TIMEOUT } from './utils/enum';
import TAG from './tag';

export const createContainer = (): Container => {
	const container: Container = new Container();

	const swapiApiConnector = new ApiConnectorUtil({
		host: HOST.SWAPI,
		timeout: TIMEOUT.PROVIDER,
	});

	container.bind<SwapiProvider>(TYPES.SwapiProvider).to(SwapiMockProviderImpl);
	container.bind<ApiConnectorUtil>(TYPES.ApiConnectorUtil).toConstantValue(swapiApiConnector).whenTargetNamed(TAG.SWAPI_PROD);
	container.bind<DataMapper>(TYPES.DataMapper).to(DataMapper);
	container.bind<StarwarsHandler>(TYPES.StarWarsHandler).to(StarwarsHandler);
	container.bind<StarwarsService>(TYPES.StarWarsService).to(StarwarsServiceImpl);
	container.bind<DatabaseRepository>(TYPES.DatabaseRepository).to(DatabaseRepositoryMysqlMockImpl);
	return container;
};
