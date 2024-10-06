/* istanbul ignore file */
import { validate, ValidationError } from 'class-validator';
import { NUM } from './enum';
import { BodyBadRequestException } from '../common/exceptions';

export class Dto {
	public static async validateRequest(dto: object): Promise<void> {
		const validationErrors: ValidationError[] = await validate(dto, {
			stopAtFirstError: true,
		});
		if (validationErrors?.length >= NUM.ONE) {
			const errorMessages = validationErrors.map((error: ValidationError) => {
				let message: string[] = [];
				if (error?.constraints) {
					message = Object.values(error?.constraints).map((m: string) => m);
				} else {
					error?.children?.forEach((childError: ValidationError): void => {
						if (childError?.constraints) {
							message = Object.values(childError?.constraints);
						} else {
							childError?.children.forEach((nestedChildern: ValidationError): void => {
								message = [...message, ...Object.values(nestedChildern?.constraints)];
							});
						}
					});
				}
				return {
					campo: error?.property,
					valor: error?.value,
					mensajes: message,
				};
			});

			throw new BodyBadRequestException('Bad Request', errorMessages); //
		}
	}
}
