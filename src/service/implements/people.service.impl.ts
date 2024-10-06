import { inject, injectable } from 'inversify';
import { PeopleService } from '../people.service';
import { TYPES } from '../../types';
import { PeopleDatabaseRepository } from '../../repository/people.database.repository';
import { SwapiProvider } from '../../provider/swapi.provider';
import { HTTP, NUM } from '../../utils/enum';
import { PeopleSwapiResponseEN, PeopleSwapiResponseES } from '../../interfaces';
import { CreateRequest } from '../../handler/request/create.request';
import { GetParameters } from '../../handler/parameters/get.parameters';
import { BadRequestException, NotFoundProviderException, ResourceExistsException } from '../../common/exceptions';
import { PeopleModel } from '../../models/people.model';
import { Dto } from '../../utils/dto';

@injectable()
export class PeopleServiceImpl implements PeopleService {
	constructor(
		@inject(TYPES.DatabaseRepository) private peopleRepository: PeopleDatabaseRepository,
		@inject(TYPES.SwapiProvider)
		private swapiProvider: SwapiProvider
	) {}

	public async create(createRequest: CreateRequest): Promise<PeopleSwapiResponseES> {
		await Dto.validateRequest(createRequest);
		await this.peopleRepository.create(PeopleModel.parsePersonToSaveDatabase(createRequest));
		const exists: boolean = await this.peopleRepository.verifyIfExist(createRequest.name);
		if (exists) {
			throw new ResourceExistsException(`El registro '${createRequest.name}' existe.`, createRequest.name);
		}
		return PeopleModel.translateToSpanish(createRequest);
	}

	public async getByName(getParameters: GetParameters): Promise<PeopleSwapiResponseES[]> {
		await Dto.validateRequest(getParameters);
		const peopleDatabaseResponses: PeopleSwapiResponseEN[] = await this.peopleRepository.getByName(getParameters.name);
		if (peopleDatabaseResponses.length >= NUM.ONE) {
			return peopleDatabaseResponses.map((people: PeopleSwapiResponseEN) => PeopleModel.parseDatabaseToResponse(PeopleModel.translateToSpanish(people)));
		}
		const peopleResponse: PeopleSwapiResponseEN[] = await this.searchPeopleByWord(getParameters.name);
		return peopleResponse.map((people) => PeopleModel.translateToSpanish(people));
	}

	private async searchPeopleByWord(word: string): Promise<PeopleSwapiResponseEN[]> {
		const { statusCode, body } = await this.swapiProvider.searchPeople(word);
		if (statusCode !== HTTP.STATUS_CODE_200) throw new BadRequestException(`bad request value: ${word}`);
		if (body.count === NUM.ZERO) throw new NotFoundProviderException(`Not found value: ${word}`);
		return body.results;
	}
}
