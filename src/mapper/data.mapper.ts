import { $log } from 'ts-log-debug';
import { injectable } from 'inversify';
import { HEADERS, HTTP, NAME, NAME_TYPE, POSITION } from '../utils/enum';
import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';
import { PeopleResponse } from '../interfaces/people-response.interface';
import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';

@injectable()
export default class DataMapper {
	// eslint-disable-next-line class-methods-use-this
	public static parsePeopleSwapi(people: PeopleSwapiResponse): PeopleResponse {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_PEOPLE_SWAPI);
		return this.parsePeopleEnglishToSpanish(people);
	}

	public static parsePeopleDatabase(people: PeopleDatabaseResponse): PeopleResponse {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_PEOPLE_DATABASE);
		return this.parsePeopleEnglishToSpanish(people);
	}
	private static parsePeopleEnglishToSpanish(people: PeopleDatabaseResponse | PeopleSwapiResponse): PeopleResponse {
		return {
			nombre: people.name,
			altura: people.height,
			masa: people.mass,
			color_del_cabello: people.hair_color,
			color_de_piel: people.skin_color,
			color_de_ojos: people.eye_color,
			fecha_de_nacimiento: people.birth_year,
			genero: people.gender,
			planeta_natal: people.homeworld,
			peliculas: people?.films,
			especies: people?.species,
			vehiculos: people?.vehicles,
			naves_estelares: people?.starships,
			creado: people.created,
			editado: people.edited,
			url: people.url,
		};
	}
	public static parseStatusCode(status: string): HTTP {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_STATUS_CODE);
		if (!/^\d+$/.test(status)) return HTTP.STATUS_CODE_500;

		if (Object.values(HTTP).includes(Number(status) as HTTP)) return Number(status) as HTTP;
		$log.warn(`${NAME_TYPE.DATA_MAPPER} function parseStatusCode() | No status code found`);
		return HTTP.STATUS_CODE_500;
	}

	public static parseHeaders(headers: any): any {
		return {
			contentType: headers[HEADERS.CONTENT_TYPE] || HEADERS.CONTENT_TYPE.toLowerCase() || headers[HEADERS.CONTENT_TYPE.toUpperCase()],
			application: headers[HEADERS.APPLICATION] || HEADERS.APPLICATION.toLowerCase() || headers[HEADERS.APPLICATION.toUpperCase()],
			userAgent: headers[HEADERS.USER_AGENT] || HEADERS.USER_AGENT.toLowerCase() || headers[HEADERS.USER_AGENT.toUpperCase()],
		};
	}
	public static parseArray(arr: any[]): string[] {
		const result: string[] = [];
		arr.forEach((element, index): void => {
			result.push(`$${String(index + POSITION.FIRST).padEnd(POSITION.SECOND, ' ')} ${element}`);
		});
		return result;
	}
}
