import 'reflect-metadata';
import { DatabaseRepository } from '../../src/repository/database.repository';
import { SwapiProvider } from '../../src/provider/swapi.provider';
import { HTTP, NUM, POSITION } from '../../src/utils/enum';
import { StarwarsService } from '../../src/service/starwars.service';
import StarwarsServiceImpl from '../../src/service/implements/starwars.service.impl';
import ResponseProvider from '../../src/interfaces/provider-response.interface';
import { PeopleSwapiResponse } from '../../src/interfaces/people-swapi-response.interface';
import CreateRequest from '../../src/handler/request/create.request';
import BodyBadRequestException from '../../src/common/exceptions/body-bad-request.exception';
import DataMapper from '../../src/mapper/data.mapper';
import GetParameters from '../../src/handler/parameters/get.parameters';
import { PeopleDatabaseResponse } from '../../src/interfaces/people-database-response.interface';

describe('StarWars Service', () => {
	let mockDatabaseRepository: jest.Mocked<DatabaseRepository>;
	let mockSwapiProvider: jest.Mocked<SwapiProvider>;

	const peopleSwapiResponseOk: PeopleSwapiResponse = {
		name: 'Luke Skywalker',
		height: '172',
		mass: '77',
		hair_color: 'blond',
		skin_color: 'fair',
		eye_color: 'blue',
		birth_year: '19BBY',
		gender: 'male',
		homeworld: 'https://swapi.py4e.com/api/planets/1/',
		films: [
			'https://swapi.py4e.com/api/films/1/',
			'https://swapi.py4e.com/api/films/2/',
			'https://swapi.py4e.com/api/films/3/',
			'https://swapi.py4e.com/api/films/6/',
			'https://swapi.py4e.com/api/films/7/',
		],
		species: ['https://swapi.py4e.com/api/species/1/'],
		vehicles: ['https://swapi.py4e.com/api/vehicles/14/', 'https://swapi.py4e.com/api/vehicles/30/'],
		starships: ['https://swapi.py4e.com/api/starships/12/', 'https://swapi.py4e.com/api/starships/22/'],
		created: '2014-12-09T13:50:51.644000Z',
		edited: '2014-12-20T21:17:56.891000Z',
		url: 'https://swapi.py4e.com/api/people/1/',
	};
	const peopleDatabaseResponse: PeopleDatabaseResponse = {
		name: 'Luke Skywalker',
		height: '172',
		mass: '77',
		hair_color: 'blond',
		skin_color: 'fair',
		eye_color: 'blue',
		birth_year: '19BBY',
		gender: 'male',
		homeworld: 'https://swapi.py4e.com/api/planets/1/',
		films: JSON.stringify([
			'https://swapi.py4e.com/api/films/1/',
			'https://swapi.py4e.com/api/films/2/',
			'https://swapi.py4e.com/api/films/3/',
			'https://swapi.py4e.com/api/films/6/',
			'https://swapi.py4e.com/api/films/7/',
		]),
		species: JSON.stringify(['https://swapi.py4e.com/api/species/1/']),
		vehicles: JSON.stringify(['https://swapi.py4e.com/api/vehicles/14/', 'https://swapi.py4e.com/api/vehicles/30/']),
		starships: JSON.stringify(['https://swapi.py4e.com/api/starships/12/', 'https://swapi.py4e.com/api/starships/22/']),
		created: new Date('2014-12-09T13:50:51.644000Z'),
		edited: new Date('2014-12-09T13:50:51.644000Z'),
		url: 'https://swapi.py4e.com/api/people/1/',
	};
	const bodyNativeCreateOk = {
		nombre: 'Luke Skywalker'.toLowerCase(),
		altura: '172',
		masa: '77',
		color_del_cabello: 'blond',
		color_de_piel: 'fair',
		color_de_ojos: 'blue',
		fecha_de_nacimiento: '19BBY',
		genero: 'male',
		planeta_natal: 'https://swapi.py4e.com/api/planets/1/',
		peliculas: [
			'https://swapi.py4e.com/api/films/1/',
			'https://swapi.py4e.com/api/films/2/',
			'https://swapi.py4e.com/api/films/3/',
			'https://swapi.py4e.com/api/films/6/',
			'https://swapi.py4e.com/api/films/7/',
		] as string[],
		especies: ['https://swapi.py4e.com/api/species/1/'] as string[],
		vehiculos: ['https://swapi.py4e.com/api/vehicles/14/', 'https://swapi.py4e.com/api/vehicles/30/'] as string[],
		naves_estelares: ['https://swapi.py4e.com/api/starships/12/', 'https://swapi.py4e.com/api/starships/22/'] as string[],
		url: 'https://swapi.py4e.com/api/people/1/',
	};
	const bodyNativeSearchByName = {
		nombre: 'Luke Skywalker',
	};

	const peopleResponseOkV2 = DataMapper.parsePeopleFromSwapi(peopleSwapiResponseOk);
	const responseProviderOk: ResponseProvider = { statusCode: HTTP.STATUS_CODE_200, body: { count: 1, next: null, previous: null, results: [peopleSwapiResponseOk] } };
	const responseProviderNoOk: ResponseProvider = { statusCode: HTTP.STATUS_CODE_200, body: { count: 0, next: null, previous: null, results: [] } };
	const responseProviderNoOkV2: ResponseProvider = { statusCode: HTTP.STATUS_CODE_500, body: { count: 0, next: null, previous: null, results: [] } };

	beforeEach(() => {
		mockSwapiProvider = {
			search: jest.fn().mockResolvedValue(responseProviderOk),
		};
	});

	beforeEach(() => {
		mockDatabaseRepository = {
			getByName: jest.fn().mockResolvedValue([]),
			create: jest.fn().mockResolvedValue(NUM.ONE),
		};
	});

	describe('Create', (): void => {
		let tokenService: StarwarsService;
		beforeEach(() => {
			tokenService = new StarwarsServiceImpl(mockDatabaseRepository, mockSwapiProvider);
		});
		describe('Successfully', () => {
			it('Should send an Successfully', async (): Promise<void> => {
				const createRequest: CreateRequest = new CreateRequest(bodyNativeCreateOk as any);
				const response = await tokenService.create(createRequest);
				response.creado = peopleResponseOkV2.creado;
				response.editado = peopleResponseOkV2.editado;
				expect(response).toEqual(peopleResponseOkV2);
			});
		});
		describe('Errors', () => {
			describe('Errors Body', () => {
				it('Should send an Exception BodyBadRequestException | body: nombre', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, nombre: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: altura', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, altura: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: masa', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, masa: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: color_del_cabello', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, color_del_cabello: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: color_de_piel', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, color_de_piel: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: color_de_ojos', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, color_de_ojos: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: fecha_de_nacimiento', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, fecha_de_nacimiento: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: genero', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, genero: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: planeta_natal', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, planeta_natal: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: peliculas', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, peliculas: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: especies', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, especies: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: vehiculos', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, vehiculos: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: naves_estelares', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, naves_estelares: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: url', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ bodyNativeCreateOk, url: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
			});
			it('Should send an exception Error', async (): Promise<void> => {
				mockDatabaseRepository.create.mockRejectedValue(new Error());
				const createRequest: CreateRequest = new CreateRequest(bodyNativeCreateOk as any);
				await expect(tokenService.create(createRequest)).rejects.toThrow(Error);
			});
		});
	});
	describe('GetByName', (): void => {
		let tokenService: StarwarsService;
		beforeEach(() => {
			tokenService = new StarwarsServiceImpl(mockDatabaseRepository, mockSwapiProvider);
		});
		describe('Successfully', () => {
			it('Should send an Successfully, data from Database', async (): Promise<void> => {
				mockDatabaseRepository.getByName.mockResolvedValue([peopleDatabaseResponse]);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName);
				const response = await tokenService.getByName(getParameters);
				response[POSITION.ZERO].creado = peopleResponseOkV2.creado;
				response[POSITION.ZERO].editado = peopleResponseOkV2.editado;
				response[POSITION.ZERO].peliculas = peopleResponseOkV2.peliculas;
				response[POSITION.ZERO].especies = peopleResponseOkV2.especies;
				response[POSITION.ZERO].vehiculos = peopleResponseOkV2.vehiculos;
				response[POSITION.ZERO].naves_estelares = peopleResponseOkV2.naves_estelares;
				expect(response).toEqual([peopleResponseOkV2]);
			});
			it('Should send an Successfully, data from SWAPI', async (): Promise<void> => {
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName);
				const response = await tokenService.getByName(getParameters);
				expect(response).toEqual([peopleResponseOkV2]);
			});
		});
		describe('Errors', () => {
			describe('Errors Body', () => {
				it('Should send an Exception BodyBadRequestException | body: nombre', async (): Promise<void> => {
					const getParameters: GetParameters = new GetParameters({ nombre: undefined });
					await expect(tokenService.getByName(getParameters)).rejects.toThrow(BodyBadRequestException);
				});
			});
			it('Should send an exception in repository', async (): Promise<void> => {
				mockDatabaseRepository.getByName.mockRejectedValue(new Error());
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
			it('Should send an provider empty', async (): Promise<void> => {
				mockSwapiProvider.search.mockResolvedValue(responseProviderNoOk);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
			it('Should send an provider no ok', async (): Promise<void> => {
				mockSwapiProvider.search.mockResolvedValue(responseProviderNoOkV2);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
			it('Should send an provider no ok | v2', async (): Promise<void> => {
				mockSwapiProvider.search.mockResolvedValue(peopleResponseOkV2);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
		});
	});
});
