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
	peliculas?: object | string[] | string;
	especies?: object | string[] | string;
	vehiculos?: object | string[] | string;
	naves_estelares?: object | string[] | string;
	creado: Date;
	editado: Date;
}
