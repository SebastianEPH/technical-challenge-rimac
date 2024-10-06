export interface swapiResponse<T> {
	count: number;
	next: any;
	previous: any;
	results: T[];
}

export interface PeopleSwapiResponseEN {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[] | object | string;
	species: string[] | object | string;
	vehicles: string[] | object | string;
	starships: string[] | object | string;
	created?: string | Date;
	edited?: string | Date;
	url: string;
}
