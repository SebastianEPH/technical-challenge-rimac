import axios, { AxiosInstance } from 'axios';
import { $log } from 'ts-log-debug';
import ResponseProvider from '../interfaces/provider-response.interface';
import DataMapper from '../mapper/data.mapper';
import { NAME_TYPE } from './enum';

interface ApiConnectorConfig {
	host: string;
	timeout: number;
}
export default class ApiConnectorUtil {
	private axiosInstance: AxiosInstance;

	constructor(private readonly config: ApiConnectorConfig) {
		this.axiosInstance = axios.create({
			baseURL: this.config.host,
			timeout: this.config.timeout,
		});
	}

	async get(path: string, headers: object = {}): Promise<ResponseProvider> {
		try {
			const { data, status, headers: headerResponse, config, request } = await this.axiosInstance.get(path, { headers });
			return {
				statusCode: DataMapper.parseStatusCode(String(status)),
				body: data,
				config,
				headers: headerResponse,
				request,
			};
		} catch (error) {
			$log.info(`${NAME_TYPE.API_CONNECTOR} Error in call provider`, JSON.stringify(error));
			return {
				statusCode: DataMapper.parseStatusCode(String(error.response?.status)),
				body: error.response?.data,
				headers: error.response?.headers,
				config: error.response?.config,
				request: error.response?.request,
			};
		}
	}

	async post(path: string, payload: object, headers: object = {}): Promise<ResponseProvider> {
		try {
			const { data, status, headers: headerResponse, config, request } = await this.axiosInstance.post(path, payload, { headers });
			return {
				statusCode: DataMapper.parseStatusCode(String(status)),
				body: data,
				config,
				headers: headerResponse,
				request,
			};
		} catch (error) {
			$log.info(`${NAME_TYPE.API_CONNECTOR} Error in call provider`, JSON.stringify(error));
			return {
				statusCode: DataMapper.parseStatusCode(String(error.response?.status)),
				body: error.response?.data,
				headers: error.response?.headers,
				config: error.response?.config,
				request: error.response?.request,
			};
		}
	}
}
