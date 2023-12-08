import { ArrayMinSize, IsArray, IsDefined, IsString, Length } from 'class-validator';
import { MAX_WORD, MIN_WORD } from '../../utils/constants';
import { PeopleResponse } from '../../interfaces/people-response.interface';
import { NUM } from '../../utils/enum';
import ERRORS from '../../common/constants/errors.constans';

export default class CreateRequest {
	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_NAME,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_NAME,
	})
	@Length(MIN_WORD, MAX_WORD, { message: ERRORS.VALIDATOR_PARAMS_NAME })
	name: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_HEIGHT,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_HEIGHT,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_HEIGHT,
	})
	height: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_MASS,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_MASS,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_MASS,
	})
	mass: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_HAIR_COLOR,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_HAIR_COLOR,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_HAIR_COLOR,
	})
	hair_color: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_SKIN_COLOR,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_SKIN_COLOR,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_SKIN_COLOR,
	})
	skin_color: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_EYE_COLOR,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_EYE_COLOR,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_EYE_COLOR,
	})
	eye_color: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_BIRTH_YEAR,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_BIRTH_YEAR,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_BIRTH_YEAR,
	})
	birth_year: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_GENDER,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_GENDER,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_GENDER,
	})
	gender: string;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_HOME_WORLD,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_HOME_WORLD,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_HOME_WORLD,
	})
	homeworld: string;

	@ArrayMinSize(NUM.ONE, { message: ERRORS.VALIDATOR_PARAMS_FILMS })
	@IsArray({ message: ERRORS.VALIDATOR_PARAMS_FILMS })
	@IsString({ each: true, message: ERRORS.VALIDATOR_PARAMS_FILMS })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: ERRORS.VALIDATOR_PARAMS_FILMS })
	films: string[] | object;

	@ArrayMinSize(NUM.ONE, { message: ERRORS.VALIDATOR_PARAMS_ESPECIES })
	@IsArray({ message: ERRORS.VALIDATOR_PARAMS_ESPECIES })
	@IsString({ each: true, message: ERRORS.VALIDATOR_PARAMS_ESPECIES })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: ERRORS.VALIDATOR_PARAMS_ESPECIES })
	species: string[] | object;

	@ArrayMinSize(NUM.ONE, { message: ERRORS.VALIDATOR_PARAMS_VEHICLES })
	@IsArray({ message: ERRORS.VALIDATOR_PARAMS_VEHICLES })
	@IsString({ each: true, message: ERRORS.VALIDATOR_PARAMS_VEHICLES })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: ERRORS.VALIDATOR_PARAMS_VEHICLES })
	vehicles: string[] | object;

	@ArrayMinSize(NUM.ONE, { message: ERRORS.VALIDATOR_PARAMS_STARTSHIPS })
	@IsArray({ message: ERRORS.VALIDATOR_PARAMS_STARTSHIPS })
	@IsString({ each: true, message: ERRORS.VALIDATOR_PARAMS_STARTSHIPS })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: ERRORS.VALIDATOR_PARAMS_STARTSHIPS })
	starships: string[] | object;

	@IsDefined({
		message: ERRORS.VALIDATOR_PARAMS_URL,
	})
	@IsString({
		message: ERRORS.VALIDATOR_PARAMS_URL,
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: ERRORS.VALIDATOR_PARAMS_URL,
	})
	url: string;

	constructor(createRequestProps: PeopleResponse) {
		this.name = createRequestProps.nombre;
		this.height = createRequestProps.altura;
		this.mass = createRequestProps.masa;
		this.hair_color = createRequestProps.color_del_cabello;
		this.skin_color = createRequestProps.color_de_piel;
		this.eye_color = createRequestProps.color_de_ojos;
		this.birth_year = createRequestProps.fecha_de_nacimiento;
		this.gender = createRequestProps.genero;
		this.homeworld = createRequestProps.planeta_natal;
		this.films = createRequestProps.peliculas as string[];
		this.species = createRequestProps.especies as string[];
		this.vehicles = createRequestProps.vehiculos as string[];
		this.starships = createRequestProps.naves_estelares as string[];
		this.url = createRequestProps.url;
	}
}
