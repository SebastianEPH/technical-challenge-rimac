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
				films: [
					'https://swapi.py4e.com/api/films/1/',
					'https://swapi.py4e.com/api/films/2/',
					'https://swapi.py4e.com/api/films/3/',
					'https://swapi.py4e.com/api/films/6/',
					'https://swapi.py4e.com/api/films/7/',
				],
				homeworld: 'https://swapi.py4e.com/api/planets/1/',
				starships: ['https://swapi.py4e.com/api/starships/12/'],
				species: ['https://swapi.py4e.com/api/species/1/'],
				vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
				edited: '2023-12-08T05:00:00.000Z',
				url: 'https://swapi.py4e.com/api/people/1/',
				created: '2023-12-08T05:00:00.000Z',
			} as any,
		];
	}
}
