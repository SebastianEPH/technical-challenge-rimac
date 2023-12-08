import { $log } from 'ts-log-debug';
import { injectable } from 'inversify';
import { HTTP, NAME, NAME_TYPE, POSITION, TYPE_OF } from '../utils/enum';
import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';
import { PeopleResponse } from '../interfaces/people-response.interface';
import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';
import CreateRequest from '../handler/request/create.request';

@injectable()
export default class DataMapper {
	public static parsePeopleFromSwapi(people: PeopleSwapiResponse): PeopleResponse {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_PEOPLE_FROM_SWAPI);
		return this.parsePeopleEnglishToSpanish(people);
	}

	public static parsePeopleFromDatabase(people: PeopleDatabaseResponse): PeopleResponse {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_PEOPLE_FROM_DATABASE);
		return this.parsePeopleEnglishToSpanish(people);
	}

	private static parsePeopleEnglishToSpanish(people: PeopleDatabaseResponse | PeopleSwapiResponse): PeopleResponse {
		return {
			nombre: people.name.toLowerCase().trim(),
			altura: people.height,
			masa: people.mass,
			color_del_cabello: people.hair_color,
			color_de_piel: people.skin_color,
			color_de_ojos: people.eye_color,
			fecha_de_nacimiento: people.birth_year,
			genero: people.gender,
			planeta_natal: people.homeworld,
			peliculas: people.films === typeof TYPE_OF.OBJECT ? JSON.parse(people.films) : people.films,
			especies: people.species === typeof TYPE_OF.OBJECT ? JSON.parse(people.species) : people.species,
			vehiculos: people.vehicles === typeof TYPE_OF.OBJECT ? JSON.parse(people.vehicles) : people.vehicles,
			naves_estelares: people.starships === typeof TYPE_OF.OBJECT ? JSON.parse(people.starships) : people.starships,
			creado: new Date(people.created),
			editado: new Date(people.edited),
			url: people.url,
		};
	}

	public static parsePersonToSaveDatabase(peopleSwapiResponse: CreateRequest): PeopleDatabaseResponse {
		return {
			...peopleSwapiResponse,
			name: peopleSwapiResponse.name.toLowerCase().trim(),
			films: JSON.stringify(peopleSwapiResponse.films),
			species: JSON.stringify(peopleSwapiResponse.species),
			vehicles: JSON.stringify(peopleSwapiResponse.vehicles),
			starships: JSON.stringify(peopleSwapiResponse.starships),
			created: new Date(),
			edited: new Date(),
		};
	}

	public static parseStatusCode(status: string): HTTP {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_STATUS_CODE);
		if (!/^\d+$/.test(status)) return HTTP.STATUS_CODE_500;
		if (Object.values(HTTP).includes(Number(status) as HTTP)) return Number(status) as HTTP;
		$log.warn(`${NAME_TYPE.DATA_MAPPER + NAME.PARSE_STATUS_CODE} No status code found`);
		return HTTP.STATUS_CODE_500;
	}

	public static parseArray(arr: any[]): string[] {
		const result: string[] = [];
		arr.forEach((element, index): void => {
			result.push(`$${String(index + POSITION.FIRST).padEnd(POSITION.SECOND, ' ')} ${element}`);
		});
		return result;
	}
}
