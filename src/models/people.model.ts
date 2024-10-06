import { PeopleSwapiResponseEN, PeopleSwapiResponseES } from '../interfaces';
import { TranslateUtil } from '../utils';

export class PeopleModel {
	private static readonly spanishTranslationMap: { [key: string]: string } = {
		name: 'nombre',
		height: 'altura',
		mass: 'masa',
		hair_color: 'color_del_cabello',
		skin_color: 'color_de_piel',
		eye_color: 'color_de_ojos',
		birth_year: 'fecha_de_nacimiento',
		gender: 'genero',
		homeworld: 'planeta_origen',
		films: 'peliculas',
		species: 'especies',
		vehicles: 'vehiculos',
		starships: 'naves',
		created: 'creado',
		edited: 'editado',
		url: 'url',
	};

	private static readonly englishPropertiesJson = ['films', 'species', 'vehicles', 'starships'];

	private static readonly spanishPropertiesJson = ['peliculas', 'especies', 'vehiculos', 'naves'];

	public static translateToSpanish(swapiResponseEN: PeopleSwapiResponseEN): PeopleSwapiResponseES {
		return TranslateUtil.withMapping(this.spanishTranslationMap, swapiResponseEN);
	}

	public static parseDatabaseToResponse(peopleDatabaseResponse: PeopleSwapiResponseES): PeopleSwapiResponseES {
		const parsedResponse = { ...peopleDatabaseResponse };
		PeopleModel.spanishPropertiesJson.forEach((prop) => {
			parsedResponse[prop] = JSON.parse(peopleDatabaseResponse[prop]);
		});
		return { ...parsedResponse };
	}

	public static parsePersonToSaveDatabase(peopleSwapiResponse: PeopleSwapiResponseEN): PeopleSwapiResponseEN {
		const parsedResponse = { ...peopleSwapiResponse };
		PeopleModel.englishPropertiesJson.forEach((prop) => {
			parsedResponse[prop] = JSON.stringify(peopleSwapiResponse[prop]);
		});
		return { ...parsedResponse };
	}
}
