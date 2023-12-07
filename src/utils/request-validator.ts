import CustomErrorResponse from '../interfaces/custom.error';
import { validate, ValidationError } from 'class-validator';
import { POSITION } from './enum';

export default class RequestValidator {
	static async validateRequest(data: any, options: object = {}): Promise<void | CustomErrorResponse> {
		const requestErrors = await validate(data, options);
		if (requestErrors.length > POSITION.ZERO) {
			const errors = this.processRequestErrors(requestErrors);
			return errors[POSITION.ZERO];
		}
		return null;
	}

	static processRequestErrors(requestErrors: ValidationError[]): CustomErrorResponse[] {
		return requestErrors.map((error): CustomErrorResponse => JSON.parse(Object.values(error.constraints)[POSITION.ZERO]));
	}
}
