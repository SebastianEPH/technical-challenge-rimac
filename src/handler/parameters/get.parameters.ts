import { IsDefined, IsString, Length } from 'class-validator';
import { MAX_WORD, MIN_WORD } from '../../utils/constants';
import ERRORS from '../../common/constants/errors.constans';

export default class GetParameters {
	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_NAME,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_NAME,
	})
	@Length(MIN_WORD, MAX_WORD, { message: ERRORS.VALIDATOR_PARAMS_NAME })
	name: string;

	constructor({ nombre }: { nombre: string }) {
		this.name = nombre;
	}
}
