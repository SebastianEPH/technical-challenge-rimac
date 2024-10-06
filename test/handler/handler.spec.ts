import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';
import { PeopleService } from '../../src/service/people.service';
import { StarwarsHandler } from '../../src/handler/starwars.handler';
import { ResponseVO } from '../../src/models/response.vo';
import { HTTP } from '../../src/utils/enum';
import { BadRequestException, BodyBadRequestException, InternalServerErrorException, NotFoundProviderException, ResourceExistsException } from '../../src/common/exceptions';

describe('Should test the PeopleService Controller', () => {
	let mockStarwarsService: jest.Mocked<PeopleService>;

	const mockApiGatewayEvent: APIGatewayEvent = {
		body: JSON.stringify({}),
		cookies: [],
		headers: {
			'user-agent': 'PostmanRuntime/7.35.0',
			accept: '*/*',
			'cache-control': 'no-cache',
			'postman-token': 'bd9e2639-9e8b-4f41-9407-ff2721cb1b5c',
			host: 'localhost:3000',
			'accept-encoding': 'gzip, deflate, br',
			connection: 'keep-alive',
		},
		isBase64Encoded: false,
		pathParameters: { id: 'NombrePersona' },
		queryStringParameters: { nombre: 'notfound' },
		rawPath: '/api/v1/starwars/people/NombrePersona',
		rawQueryString: 'nombre=notfound',
		requestContext: {
			accountId: 'offlineContext_accountId',
			apiId: 'offlineContext_apiId',
			authorizer: { jwt: [Object] },
			domainName: 'offlineContext_domainName',
			domainPrefix: 'offlineContext_domainPrefix',
			http: {
				method: 'GET',
				path: '/api/v1/starwars/people/NombrePersona',
				protocol: 'HTTP/1.1',
				sourceIp: '::1',
				userAgent: 'PostmanRuntime/7.35.0',
			},
			operationName: undefined,
			requestId: 'offlineContext_resourceId',
			routeKey: 'GET /api/v1/starwars/people/{id}',
			stage: '$default',
			time: '08/Dec/2023:03:02:09 -0500',
			timeEpoch: 1702022529558,
		},
		routeKey: 'GET /api/v1/starwars/people/{id}',
		stageVariables: null,
		version: '2.0',
	} as any as APIGatewayEvent;

	const mockApiGatewayEventNoOk: APIGatewayEvent = {
		body: JSON.stringify({}),
		cookies: [],
		headers: {
			'user-agent': 'PostmanRuntime/7.35.0',
			accept: '*/*',
			'cache-control': 'no-cache',
			'postman-token': 'bd9e2639-9e8b-4f41-9407-ff2721cb1b5c',
			host: 'localhost:3000',
			'accept-encoding': 'gzip, deflate, br',
			connection: 'keep-alive',
		},
		isBase64Encoded: false,
		pathParameters: null,
		queryStringParameters: null,
		rawPath: '/api/v1/starwars/people/NombrePersona',
		rawQueryString: 'nombre=notfound',
		requestContext: {
			accountId: 'offlineContext_accountId',
			apiId: 'offlineContext_apiId',
			authorizer: { jwt: [Object] },
			domainName: 'offlineContext_domainName',
			domainPrefix: 'offlineContext_domainPrefix',
			http: {
				method: 'GET',
				path: '/api/v1/starwars/people/NombrePersona',
				protocol: 'HTTP/1.1',
				sourceIp: '::1',
				userAgent: 'PostmanRuntime/7.35.0',
			},
			operationName: undefined,
			requestId: 'offlineContext_resourceId',
			routeKey: 'GET /api/v1/starwars/people/{id}',
			stage: '$default',
			time: '08/Dec/2023:03:02:09 -0500',
			timeEpoch: 1702022529558,
		},
		routeKey: 'GET /api/v1/starwars/people/{id}',
		stageVariables: null,
		version: '2.0',
	} as any as APIGatewayEvent;

	const responseSuccess = {};

	beforeEach(() => {
		mockStarwarsService = {
			create: jest.fn().mockReturnValue(responseSuccess),
			getByName: jest.fn().mockReturnValue({}),
		};
	});
	describe('Create', () => {
		let threeDSHandler: StarwarsHandler;
		beforeEach(() => {
			threeDSHandler = new StarwarsHandler(mockStarwarsService);
		});
		it('Should be to function', async () => {
			expect(typeof threeDSHandler.create).toBe('function');
		});
		describe('Sucessfully', () => {
			it('Should respond with an success | 201', async (): Promise<void> => {
				const response: ResponseVO = await threeDSHandler.create(mockApiGatewayEvent);
				expect(response.statusCode).toBe(HTTP.STATUS_CODE_201);
			});
		});
		describe('Errors', () => {
			it('Should return an error with exception NotFoundProviderException', async () => {
				mockStarwarsService.create.mockRejectedValue(new NotFoundProviderException(''));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_404);
			});

			it('Should return an error with exception mockApiGatewayEvent body not found', async () => {
				mockStarwarsService.create.mockRejectedValue(new NotFoundProviderException(''));
				const result = await threeDSHandler.create({ ...mockApiGatewayEvent, body: undefined });
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_404);
			});
			it('Should return an error with exception NotFoundProviderException v2 ', async () => {
				mockStarwarsService.create.mockRejectedValue(new NotFoundProviderException());
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_404);
			});
			it('Should return an error with exception BadRequestException', async () => {
				mockStarwarsService.create.mockRejectedValue(new BadRequestException(''));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception BadRequestException v2 ', async () => {
				mockStarwarsService.create.mockRejectedValue(new BadRequestException());
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception InternalServerErrorException', async () => {
				mockStarwarsService.create.mockRejectedValue(new InternalServerErrorException(''));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_500);
			});
			it('Should return an error with exception InternalServerErrorException v2 ', async () => {
				mockStarwarsService.create.mockRejectedValue(new InternalServerErrorException());
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_500);
			});
			it('Should return an error with exception BodyBadRequestException', async () => {
				mockStarwarsService.create.mockRejectedValue(new BodyBadRequestException('', {}));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception BodyBadRequestException v2', async () => {
				mockStarwarsService.create.mockRejectedValue(new BodyBadRequestException(undefined, {}));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception ResourceExistsException', async () => {
				mockStarwarsService.create.mockRejectedValue(new ResourceExistsException('', 'name'));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_409);
			});
			it('Should return an error with exception ResourceExistsException v2', async () => {
				mockStarwarsService.create.mockRejectedValue(new ResourceExistsException(undefined, 'name'));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_409);
			});
			it('Should return an error with exception Error', async () => {
				mockStarwarsService.create.mockRejectedValue(new Error(''));
				const result = await threeDSHandler.create(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_500);
			});
		});
	});
	describe('get', () => {
		let threeDSHandler: StarwarsHandler;
		beforeEach(() => {
			threeDSHandler = new StarwarsHandler(mockStarwarsService);
		});
		it('Should be to function', async () => {
			expect(typeof threeDSHandler.get).toBe('function');
		});
		describe('Sucessfully', () => {
			it('Should respond with an success | 200', async (): Promise<void> => {
				const response: ResponseVO = await threeDSHandler.get(mockApiGatewayEvent);
				expect(response.statusCode).toBe(HTTP.STATUS_CODE_200);
			});
			it('Should respond with an success | 200', async (): Promise<void> => {
				const response: ResponseVO = await threeDSHandler.get(mockApiGatewayEventNoOk);
				expect(response.statusCode).toBe(HTTP.STATUS_CODE_200);
			});
		});
		describe('Errors', () => {
			it('Should return an error with exception NotFoundProviderException', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new NotFoundProviderException(''));
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_404);
			});
			it('Should return an error with exception NotFoundProviderException v2 ', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new NotFoundProviderException());
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_404);
			});
			it('Should return an error with exception BadRequestException', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new BadRequestException(''));
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception BadRequestException v2 ', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new BadRequestException());
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception InternalServerErrorException', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new InternalServerErrorException(''));
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_500);
			});
			it('Should return an error with exception InternalServerErrorException v2 ', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new InternalServerErrorException());
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_500);
			});
			it('Should return an error with exception BodyBadRequestException', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new BodyBadRequestException('', {}));
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception BodyBadRequestException v2', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new BodyBadRequestException(undefined, {}));
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_400);
			});
			it('Should return an error with exception Error', async () => {
				mockStarwarsService.getByName.mockRejectedValue(new Error(''));
				const result = await threeDSHandler.get(mockApiGatewayEvent);
				expect(result.statusCode).toEqual(HTTP.STATUS_CODE_500);
			});
		});
	});
});
