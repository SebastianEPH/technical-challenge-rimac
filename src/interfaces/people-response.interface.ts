export interface PeopleResponse {
	url: string;
	nombre: string;
	altura: string;
	masa: string;
	color_del_cabello: string;
	color_de_piel: string;
	color_de_ojos: string;
	fecha_de_nacimiento: string;
	genero: string;
	planeta_natal: string;
	peliculas?: object | string[];
	especies?: object | string[];
	vehiculos?: object | string[];
	naves_estelares?: object | string[];
	creado: Date;
	editado: Date;
}
