import { injectable } from 'inversify';
import { $log } from 'ts-log-debug';
import { DatabaseRepository } from '../database.repository';
import { NAME, NAME_TYPE, NUM } from '../../utils/enum';
import { PeopleDatabaseResponse } from '../../interfaces/people-database-response.interface';

@injectable()
export default class DatabaseMockRepositoryImpl implements DatabaseRepository {
	public async create(_: PeopleDatabaseResponse): Promise<number> {
		$log.info(NAME_TYPE.REPOSITORY_MOCK + NAME.CREATE);
		return NUM.ONE;
	}

	public async getByName(name: string): Promise<PeopleDatabaseResponse[]> {
		$log.info(NAME_TYPE.REPOSITORY_MYSQL + NAME.GET_BY_NAME);
		return [
			{
				id: NUM.ONE,
				name,
				height: 'MOCK',
				mass: 'MOCK',
				hair_color: 'MOCK',
				skin_color: 'MOCK',
				eye_color: 'MOCK',
				birth_year: 'MOCK',
				gender: 'MOCK',
				films: ['MOCK', 'MOCK', 'MOCK', 'MOCK', 'MOCK'],
				homeworld: 'MOCK',
				starships: ['MOCK'],
				species: ['MOCK'],
				vehicles: ['MOCK'],
				edited: '2023-12-08T05:00:00.000Z',
				url: 'MOCK',
				created: '2023-12-08T05:00:00.000Z',
			} as any,
		];
	}
}
