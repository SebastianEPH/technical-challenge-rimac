import { IsDefined, IsString, Length } from 'class-validator';
import { MAX_WORD, MIN_WORD } from '../../utils/constants';

export default class GetParameters {
	@IsDefined({
		message: JSON.stringify({ error: 'error' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'error' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'error' }),
	})
	name: string;

	constructor({ nombre }: { nombre: string }) {
		this.name = nombre;
	}
}
