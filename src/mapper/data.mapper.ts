import { $log } from 'ts-log-debug';
import { injectable } from 'inversify';
import { HTTP, NAME, NAME_TYPE, POSITION } from '../utils/enum';
import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';
import { PeopleResponse } from '../interfaces/people-response.interface';
import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';

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
			nombre: people.name.toLowerCase(),
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

	public static parsePersonToSaveDatabase(peopleSwapiResponse: PeopleSwapiResponse): PeopleDatabaseResponse {
		delete peopleSwapiResponse.films;
		delete peopleSwapiResponse.species;
		delete peopleSwapiResponse.vehicles;
		delete peopleSwapiResponse.starships;
		delete peopleSwapiResponse.created;
		delete peopleSwapiResponse.edited;
		return peopleSwapiResponse;
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
