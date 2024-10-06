import 'reflect-metadata';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { HTTP } from '../../src/utils/enum';
import { ApiConnectorUtil } from '../../src/utils';

describe('ApiConnectorUtil', () => {
	let mockAxios: MockAdapter;
	let apiConnector: ApiConnectorUtil;

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);
		apiConnector = new ApiConnectorUtil({
			host: 'http://localhost',
			timeout: 1000,
		});
	});

	afterEach(() => {
		mockAxios.reset();
	});

	it('Should make a POST request to the specified path', async () => {
		const postData = { someData: 'test' };
		const responseData = { id: 123, ...postData };
		mockAxios.onGet('/test', postData).reply(HTTP.STATUS_CODE_200, responseData);

		const response = await apiConnector.get('/test');

		expect(response.body).toEqual(responseData);
	});
	it('Should make a POST request to the specified path | version 2 ', async () => {
		const postData = { someData: 'test' };
		const responseData = { id: 123, ...postData };
		mockAxios.onGet('/test', postData).reply(HTTP.STATUS_CODE_500, responseData);
		const response = await apiConnector.get('/test');
		expect(response.body).toEqual(responseData);
	});

	it('Should make a POST request to the specified path | version 2 ', async () => {
		const postData = { someData: 'test' };
		const responseData = { id: 123, ...postData };
		mockAxios.onGet('/test', postData).reply(HTTP.STATUS_CODE_500, responseData);
		const response = await apiConnector.get('/test');
		expect(response.body).toEqual(responseData);
	});
});
