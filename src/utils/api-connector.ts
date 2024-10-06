import axios, { AxiosInstance } from 'axios';
import { ResponseProvider } from '../interfaces';
import { DataMapper } from '../mapper/data.mapper';

interface ApiConnectorConfig {
	host: string;
	timeout: number;
}
export class ApiConnectorUtil {
	private axiosInstance: AxiosInstance;

	constructor(private readonly config: ApiConnectorConfig) {
		this.axiosInstance = axios.create({
			baseURL: this.config.host,
			timeout: this.config.timeout,
		});
	}

	async get<T>(path: string, headers: object = {}): Promise<ResponseProvider<T>> {
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
