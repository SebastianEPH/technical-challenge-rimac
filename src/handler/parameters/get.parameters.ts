import { IsDefined, IsString, Length, ValidationArguments } from 'class-validator';
import { MAX_WORD, MIN_WORD } from '../../utils/constants';
import { MESSAGE_ERRORS_FIELDS_GENERIC } from '../../common/constants/errors.constans';

export class GetParameters {
	@IsDefined({
		message: ({ property }: ValidationArguments) => MESSAGE_ERRORS_FIELDS_GENERIC.NOT_DEFINED(property),
	})
	@Length(MIN_WORD, MAX_WORD, { message: (validationArguments: ValidationArguments) => MESSAGE_ERRORS_FIELDS_GENERIC.STRING_LENGTH(validationArguments, MIN_WORD, MAX_WORD) })
	@IsString({
		message: (validationArguments: ValidationArguments) => MESSAGE_ERRORS_FIELDS_GENERIC.NOT_STRING(validationArguments),
	})
	name: string;

	constructor(params: unknown) {
		Object.assign(this, params);
	}
}
