import { HTTP } from '../utils/enum';

export default interface ResponseProvider {
	statusCode: HTTP;
	body: object;
	headers?: object;
	config?: object;
	request?: object;
}
