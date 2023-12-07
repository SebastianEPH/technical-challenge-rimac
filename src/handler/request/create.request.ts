import { IsDefined, IsString, Length } from 'class-validator';
import { MAX_WORD, MIN_WORD } from '../../utils/constants';

export default class CreateRequest {
	@IsDefined({
		message: JSON.stringify({ error: 'error' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'error' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'error' }),
	})
	word: string;

	constructor({ word }: { word: string }) {
		this.word = word;
	}
}
