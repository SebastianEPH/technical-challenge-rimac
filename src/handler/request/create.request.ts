import { ArrayMinSize, IsArray, IsDefined, IsString, Length } from 'class-validator';
import { MAX_WORD, MIN_WORD } from '../../utils/constants';
import { PeopleResponse } from '../../interfaces/people-response.interface';
import { NUM } from '../../utils/enum';

export default class CreateRequest {
	@IsDefined({
		message: JSON.stringify({ error: 'name' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'name' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'name' }),
	})
	name: string;

	@IsDefined({
		message: JSON.stringify({ error: 'height' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'height' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'height' }),
	})
	height: string;

	@IsDefined({
		message: JSON.stringify({ error: 'mass' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'mass' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'mass' }),
	})
	mass: string;

	@IsDefined({
		message: JSON.stringify({ error: 'hairColor' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'hairColor' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'hairColor' }),
	})
	hair_color: string;

	@IsDefined({
		message: JSON.stringify({ error: 'skinColor' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'skinColor' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'skinColor' }),
	})
	skin_color: string;

	@IsDefined({
		message: JSON.stringify({ error: 'eyeColor' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'eyeColor' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'eyeColor' }),
	})
	eye_color: string;

	@IsDefined({
		message: JSON.stringify({ error: 'birthYear' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'birthYear' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'birthYear' }),
	})
	birth_year: string;

	@IsDefined({
		message: JSON.stringify({ error: 'gender' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'gender' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'gender' }),
	})
	gender: string;

	@IsDefined({
		message: JSON.stringify({ error: 'homeworld' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'homeworld' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'homeworld' }),
	})
	homeworld: string;

	@ArrayMinSize(NUM.ONE, { message: 'Debe haber al menos un elemento en el array' })
	@IsArray({ message: JSON.stringify({ error: 'films' }) })
	@IsString({ each: true, message: 'Cada hobby debe ser una cadena de texto' })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: JSON.stringify({ error: 'films' }) })
	films: string[] | object;

	@ArrayMinSize(NUM.ONE, { message: JSON.stringify({ error: 'species' }) })
	@IsArray({ message: JSON.stringify({ error: 'species' }) })
	@IsString({ each: true, message: JSON.stringify({ error: 'species' }) })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: JSON.stringify({ error: 'species' }) })
	species: string[] | object;

	@ArrayMinSize(NUM.ONE, { message: JSON.stringify({ error: 'vehicles' }) })
	@IsArray({ message: JSON.stringify({ error: 'vehicles' }) })
	@IsString({ each: true, message: JSON.stringify({ error: 'vehicles' }) })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: JSON.stringify({ error: 'vehicles' }) })
	vehicles: string[] | object;

	@ArrayMinSize(NUM.ONE, { message: JSON.stringify({ error: 'starships' }) })
	@IsArray({ message: JSON.stringify({ error: 'species' }) })
	@IsString({ each: true, message: JSON.stringify({ error: 'starships' }) })
	@Length(MIN_WORD, MAX_WORD, { each: true, message: JSON.stringify({ error: 'starships' }) })
	starships: string[] | object;

	@IsDefined({
		message: JSON.stringify({ error: 'url' }),
	})
	@IsString({
		message: JSON.stringify({ error: 'url' }),
	})
	@Length(MIN_WORD, MAX_WORD, {
		message: JSON.stringify({ error: 'url' }),
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
