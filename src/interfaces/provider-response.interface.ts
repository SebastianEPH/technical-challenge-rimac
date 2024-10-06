import { HTTP } from '../utils/enum';

export interface ResponseProvider<T> {
	statusCode: HTTP;
	body: T;
	headers?: object;
	config?: object;
	request?: object;
}
