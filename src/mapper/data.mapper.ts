import { $log } from 'ts-log-debug';
import { injectable } from 'inversify';
import { HTTP, NAME, NAME_TYPE } from '../utils/enum';
import { PeopleResponse } from '../interfaces/people-response.interface';
import { PeopleDatabaseResponse } from '../interfaces/people-database-response.interface';
import CreateRequest from '../handler/request/create.request';
import { PeopleSwapiResponse } from '../interfaces/people-swapi-response.interface';

@injectable()
export default class DataMapper {
	public static parsePeopleFromDatabaseSWAPI(people: PeopleDatabaseResponse): PeopleResponse {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_PEOPLE_FROM_SWAPI);
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
			peliculas: JSON.parse(people.films),
			especies: JSON.parse(people.species),
			vehiculos: JSON.parse(people.vehicles),
			naves_estelares: JSON.parse(people.starships),
			creado: new Date(people.created),
			editado: new Date(people.edited),
			url: people.url,
		};
	}

	public static parsePeopleFromSwapi(people: PeopleSwapiResponse | PeopleDatabaseResponse): PeopleResponse {
		$log.info(NAME_TYPE.DATA_MAPPER + NAME.PARSE_PEOPLE_FROM_DATABASE);
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
			peliculas: people.films,
			especies: people.species,
			vehiculos: people.vehicles,
			naves_estelares: people.starships,
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
}
