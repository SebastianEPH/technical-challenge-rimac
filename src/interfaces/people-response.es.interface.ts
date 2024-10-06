export interface PeopleSwapiResponseES {
	url: string;
	nombre: string;
	altura: string;
	masa: string;
	color_del_cabello: string;
	color_de_piel: string;
	color_de_ojos: string;
	fecha_de_nacimiento: string;
	genero: string;
	planeta_origen: string;
	peliculas?: object | string[] | string;
	especies?: object | string[] | string;
	vehiculos?: object | string[] | string;
	naves?: object | string[] | string;
	creado: Date;
	editado: Date;
}
