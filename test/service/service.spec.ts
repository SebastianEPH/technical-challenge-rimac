import 'reflect-metadata';
import { PeopleDatabaseRepository } from '../../src/repository/people.database.repository';
import { SwapiProvider } from '../../src/provider/swapi.provider';
import { HTTP, NUM, POSITION } from '../../src/utils/enum';
import { PeopleService } from '../../src/service/people.service';
import { PeopleServiceImpl } from '../../src/service/implements/people.service.impl';
import { PeopleSwapiResponseEN, swapiResponse, ResponseProvider, PeopleSwapiResponseES } from '../../src/interfaces';
import { CreateRequest } from '../../src/handler/request/create.request';
import { BodyBadRequestException, ResourceExistsException } from '../../src/common/exceptions';
import { GetParameters } from '../../src/handler/parameters/get.parameters';

describe('StarWars Service', () => {
	let mockDatabaseRepository: jest.Mocked<PeopleDatabaseRepository>;
	let mockSwapiProvider: jest.Mocked<SwapiProvider>;

	const requestCreatePeople = {
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
		url: 'https://swapi.py4e.com/api/people/1/',
	};

	const peopleSwapiResponseOk: PeopleSwapiResponseEN = new CreateRequest(requestCreatePeople);
	const peopleDatabaseResponse: PeopleSwapiResponseEN = {
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
	const bodyNativeCreateOk: PeopleSwapiResponseES = {
		nombre: 'Luke Skywalker'.toLowerCase(),
		altura: '172',
		masa: '77',
		color_del_cabello: 'blond',
		color_de_piel: 'fair',
		color_de_ojos: 'blue',
		fecha_de_nacimiento: '19BBY',
		genero: 'male',
		planeta_origen: 'https://swapi.py4e.com/api/planets/1/',
		peliculas: [
			'https://swapi.py4e.com/api/films/1/',
			'https://swapi.py4e.com/api/films/2/',
			'https://swapi.py4e.com/api/films/3/',
			'https://swapi.py4e.com/api/films/6/',
			'https://swapi.py4e.com/api/films/7/',
		] as string[],
		creado: peopleSwapiResponseOk.created as Date,
		editado: new Date(peopleSwapiResponseOk.edited),
		especies: ['https://swapi.py4e.com/api/species/1/'] as string[],
		vehiculos: ['https://swapi.py4e.com/api/vehicles/14/', 'https://swapi.py4e.com/api/vehicles/30/'] as string[],
		naves: ['https://swapi.py4e.com/api/starships/12/', 'https://swapi.py4e.com/api/starships/22/'] as string[],
		url: 'https://swapi.py4e.com/api/people/1/',
	};
	const bodyNativeSearchByName = {
		name: 'Luke Skywalker',
	};
	const responseProviderOk: ResponseProvider<swapiResponse<PeopleSwapiResponseEN>> = {
		statusCode: HTTP.STATUS_CODE_200,
		body: { count: 1, next: null, previous: null, results: [peopleSwapiResponseOk] },
	};
	const responseProviderNoOk: ResponseProvider<swapiResponse<PeopleSwapiResponseEN>> = { statusCode: HTTP.STATUS_CODE_200, body: { count: 0, next: null, previous: null, results: [] } };
	const responseProviderNoOkV2: ResponseProvider<swapiResponse<PeopleSwapiResponseEN>> = { statusCode: HTTP.STATUS_CODE_500, body: { count: 0, next: null, previous: null, results: [] } };

	beforeEach(() => {
		mockDatabaseRepository = {
			getByName: jest.fn().mockResolvedValue([]),
			verifyIfExist: jest.fn().mockResolvedValue(false),
			create: jest.fn().mockResolvedValue(NUM.ONE),
		};
		mockSwapiProvider = {
			searchPeople: jest.fn().mockResolvedValue(responseProviderOk),
		};
	});

	describe('Create', (): void => {
		let tokenService: PeopleService;
		beforeEach(() => {
			tokenService = new PeopleServiceImpl(mockDatabaseRepository, mockSwapiProvider);
		});
		describe('Successfully', () => {
			it('Should send an Successfully', async (): Promise<void> => {
				const createRequest: CreateRequest = new CreateRequest(requestCreatePeople);
				const response = await tokenService.create(createRequest);
				response.creado = bodyNativeCreateOk.creado;
				response.editado = bodyNativeCreateOk.editado;
				expect(response).toEqual(bodyNativeCreateOk);
			});
		});
		describe('Errors', () => {
			describe('Errors Body', () => {
				it('Should send an Exception BodyBadRequestException | body: name', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, name: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: name=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, name: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: name<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, name: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: height', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, height: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: height=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, height: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: height<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, height: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: mass', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, mass: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: mass=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, mass: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: mass<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, mass: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: hair_color', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, hair_color: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: hair_color=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, hair_color: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: hair_color<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, hair_color: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: skin_color', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, skin_color: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: skin_color=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, skin_color: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: skin_color<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, skin_color: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: eye_color', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, eye_color: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: eye_color=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, eye_color: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: eye_color=<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, eye_color: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: birth_year', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, birth_year: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: birth_year=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, birth_year: [1, 2, 3] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: birth_year<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, birth_year: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: gender', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, gender: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: gender=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, gender: [1, 2, 3] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: gender<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, gender: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: url', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, url: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: url=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, url: [1, 2, 3] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: url<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, url: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: homeworld', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, homeworld: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: homeworld=array', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, homeworld: [1, 2] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: homeworld<=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, homeworld: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: films', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, films: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: films>=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, films: [] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: films>=length value', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, films: [''] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: films value empty', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, films: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: species', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, species: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: species>=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, species: [] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: species>=length value', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, species: [''] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: species value empty', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, species: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: vehicles', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, vehicles: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: vehicles>=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, vehicles: [] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: vehicles>=length value', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, vehicles: [''] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: vehicles value empty', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, vehicles: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: starships', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, starships: undefined } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: starships>=length', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, starships: [] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: starships>=length value', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, starships: [''] } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: starships value empty', async (): Promise<void> => {
					const createRequest: CreateRequest = new CreateRequest({ requestCreatePeople, starships: '' } as any);
					await expect(tokenService.create(createRequest)).rejects.toThrow(BodyBadRequestException);
				});
			});
			it('Should send an exception is exists', async (): Promise<void> => {
				mockDatabaseRepository.verifyIfExist.mockResolvedValue(true);
				const createRequest: CreateRequest = new CreateRequest(requestCreatePeople);
				await expect(tokenService.create(createRequest)).rejects.toThrow(ResourceExistsException);
			});
			it('Should send an exception Error', async (): Promise<void> => {
				mockDatabaseRepository.create.mockRejectedValue(new Error());
				const createRequest: CreateRequest = new CreateRequest(requestCreatePeople);
				await expect(tokenService.create(createRequest)).rejects.toThrow(Error);
			});
		});
	});
	describe('GetByName', (): void => {
		let tokenService: PeopleService;
		beforeEach(() => {
			tokenService = new PeopleServiceImpl(mockDatabaseRepository, mockSwapiProvider);
		});
		describe('Successfully', () => {
			it('Should send an Successfully, data from Database', async (): Promise<void> => {
				mockDatabaseRepository.getByName.mockResolvedValue([peopleDatabaseResponse]);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName);
				const response = await tokenService.getByName(getParameters);
				response[POSITION.FIRST].nombre = bodyNativeCreateOk.nombre.toLowerCase();
				response[POSITION.FIRST].creado = bodyNativeCreateOk.creado;
				response[POSITION.FIRST].editado = bodyNativeCreateOk.editado;
				expect(response).toEqual([bodyNativeCreateOk]);
			});
			it('Should send an Successfully, data from SWAPI', async (): Promise<void> => {
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName);
				const response = await tokenService.getByName(getParameters);
				expect(response).toEqual([bodyNativeCreateOk]);
			});
		});
		describe('Errors', () => {
			describe('Errors Body', () => {
				it('Should send an Exception BodyBadRequestException | body: name=undefined', async (): Promise<void> => {
					const getParameters: GetParameters = new GetParameters({ name: undefined });
					await expect(tokenService.getByName(getParameters)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: name=array', async (): Promise<void> => {
					const getParameters: GetParameters = new GetParameters({ name: [1, 2] });
					await expect(tokenService.getByName(getParameters)).rejects.toThrow(BodyBadRequestException);
				});
				it('Should send an Exception BodyBadRequestException | body: name<= length', async (): Promise<void> => {
					const getParameters: GetParameters = new GetParameters({ name: '' });
					await expect(tokenService.getByName(getParameters)).rejects.toThrow(BodyBadRequestException);
				});
			});
			it('Should send an exception in repository', async (): Promise<void> => {
				mockDatabaseRepository.getByName.mockRejectedValue(new Error());
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
			it('Should send an provider empty', async (): Promise<void> => {
				mockSwapiProvider.searchPeople.mockResolvedValue(responseProviderNoOk);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
			it('Should send an provider no ok', async (): Promise<void> => {
				mockSwapiProvider.searchPeople.mockResolvedValue(responseProviderNoOkV2);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
			it('Should send an provider no ok | v2', async (): Promise<void> => {
				mockSwapiProvider.searchPeople.mockResolvedValue(peopleSwapiResponseOk as any);
				const getParameters: GetParameters = new GetParameters(bodyNativeSearchByName as any);
				await expect(tokenService.getByName(getParameters)).rejects.toThrow(Error);
			});
		});
	});
});
