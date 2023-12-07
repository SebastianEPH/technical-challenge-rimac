import { inject, injectable } from 'inversify';
import { $log } from 'ts-log-debug';
import { StarwarsService } from '../starwars.service';
import TYPES from '../../types';
import { DatabaseRepository } from '../../repository/database.repository';
import DataMapper from '../../mapper/data.mapper';
import { SwapiProvider } from '../../provider/swapi.provider';
import RequestGetInterface from '../../interfaces/request-get.interface';
import { HTTP, NAME, NAME_TYPE, POSITION } from '../../utils/enum';
import NotFoundException from '../../common/exceptions/not-found.exception';
import BadRequestException from '../../common/exceptions/bad-request.exception';
import { PeopleSwapiResponse, swapiResponse } from '../../interfaces/people-swapi-response.interface';
import CreateRequest from '../../handler/request/create.request';
import RequestValidator from '../../utils/request-validator';
import BodyBadRequestException from '../../common/exceptions/body-bad-request.exception';
import { PeopleResponse } from '../../interfaces/people-response.interface';
import { PeopleDatabaseResponse } from '../../interfaces/people-database-response.interface';

@injectable()
export default class StarwarsServiceImpl implements StarwarsService {
	constructor(
		@inject(TYPES.DatabaseRepository) private databaseRepository: DatabaseRepository,
		@inject(TYPES.SwapiProvider)
		private swapiProvider: SwapiProvider
	) {}

	public async create(createRequest: CreateRequest): Promise<PeopleResponse> {
		$log.info(`function create`);

		const error = await RequestValidator.validateRequest(createRequest);
		if (error) {
			throw new BodyBadRequestException(NAME_TYPE.SERVICE + NAME.CREATE, 'Error validating the parameters in the request', error);
		}
		const peopleResponse: PeopleSwapiResponse = await this._searchByWord(createRequest.word);
		await this.databaseRepository.create(peopleResponse);
		return DataMapper.parsePeopleSwapi(peopleResponse);
	}
	public async get(data: RequestGetInterface): Promise<PeopleResponse> {
		$log.info(`function get`, data);

		const peopleDatabaseResponses: PeopleDatabaseResponse[] = await this.databaseRepository.get({});
		$log.info(`function get`, JSON.stringify(peopleDatabaseResponses));
		return peopleDatabaseResponses.map((people) => DataMapper.parsePeopleDatabase(people));
	}

	private async _searchByWord(word: string): Promise<PeopleSwapiResponse> {
		const { statusCode, body } = await this.swapiProvider.get(word);

		if (statusCode === HTTP.STATUS_CODE_404) {
			throw new NotFoundException('', `Not found value: ${word}`);
		}
		if (statusCode !== HTTP.STATUS_CODE_200 && statusCode !== HTTP.STATUS_CODE_404) {
			throw new BadRequestException('', `bad request value: ${word}`);
		}

		return (body as swapiResponse).results[POSITION.ZERO];
	}
}
