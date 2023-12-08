import { inject, injectable } from 'inversify';
import { $log } from 'ts-log-debug';
import { StarwarsService } from '../starwars.service';
import TYPES from '../../types';
import { DatabaseRepository } from '../../repository/database.repository';
import DataMapper from '../../mapper/data.mapper';
import { SwapiProvider } from '../../provider/swapi.provider';
import { HTTP, NAME, NAME_TYPE, NUM, POSITION } from '../../utils/enum';
import NotFoundDatabaseException from '../../common/exceptions/not-found-database.exception';
import BadRequestException from '../../common/exceptions/bad-request.exception';
import { PeopleSwapiResponse, swapiResponse } from '../../interfaces/people-swapi-response.interface';
import CreateRequest from '../../handler/request/create.request';
import RequestValidator from '../../utils/request-validator';
import BodyBadRequestException from '../../common/exceptions/body-bad-request.exception';
import { PeopleResponse } from '../../interfaces/people-response.interface';
import { PeopleDatabaseResponse } from '../../interfaces/people-database-response.interface';
import GetParameters from '../../handler/parameters/get.parameters';
import NotFoundProviderException from '../../common/exceptions/not-found-provider.exception';

@injectable()
export default class StarwarsServiceImpl implements StarwarsService {
	constructor(
		@inject(TYPES.DatabaseRepository) private databaseRepository: DatabaseRepository,
		@inject(TYPES.SwapiProvider)
		private swapiProvider: SwapiProvider
	) {}

	public async create(createRequest: CreateRequest): Promise<PeopleResponse> {
		$log.info(NAME_TYPE.SERVICE + NAME.CREATE);

		const error = await RequestValidator.validateRequest(createRequest);
		if (error) {
			throw new BodyBadRequestException(NAME_TYPE.SERVICE + NAME.CREATE, 'Error validating the parameters in the request', error);
		}
		const peopleResponse: PeopleSwapiResponse = await this._searchByWord(createRequest.searchAndInsertByWord, NAME.CREATE);
		await this.databaseRepository.create(peopleResponse);
		return DataMapper.parsePeopleFromSwapi(peopleResponse);
	}

	public async getByName(getParameters: GetParameters): Promise<PeopleResponse[]> {
		$log.info(NAME_TYPE.SERVICE + NAME.GET_BY_NAME);

		const error = await RequestValidator.validateRequest(getParameters);
		if (error) {
			throw new BodyBadRequestException(NAME_TYPE.SERVICE + NAME.GET_BY_NAME, 'Error validating the parameters in the request', error);
		}
		console.log('getParameters: ', getParameters);
		const peopleDatabaseResponses: PeopleDatabaseResponse[] = await this.databaseRepository.getByName(getParameters);

		if (peopleDatabaseResponses.length <= NUM.ONE) {
			throw new NotFoundDatabaseException(NAME.GET_BY_NAME, `Not found value: ${getParameters.name}`);
		}

		$log.info(NAME_TYPE.SERVICE + NAME.GET_BY_NAME, JSON.stringify(peopleDatabaseResponses));
		return peopleDatabaseResponses.map((people) => DataMapper.parsePeopleFromDatabase(people));
	}

	private async _searchByWord(word: string, origin: NAME): Promise<PeopleSwapiResponse> {
		const { statusCode, body } = await this.swapiProvider.get(word);

		if (statusCode === HTTP.STATUS_CODE_404) {
			throw new NotFoundProviderException(origin, `Not found value: ${word}`);
		}
		if (statusCode !== HTTP.STATUS_CODE_200 && statusCode !== HTTP.STATUS_CODE_404) {
			throw new BadRequestException(origin, `bad request value: ${word}`);
		}

		return (body as swapiResponse).results[POSITION.ZERO];
	}
}
