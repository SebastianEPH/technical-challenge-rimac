import { ValidationArguments } from 'class-validator';
import { ERROR_OBJECT, ERROR_TYPE } from '../../utils/enum';
import { Util } from '../../utils/util';

export const MESSAGE_ERRORS_FIELDS_GENERIC = {
	NOT_DEFINED: (nameField: string): string => `El campo '${nameField}' es obligatorio`,
	ARRAY_MIN_LENGTH: ({ property }: ValidationArguments): string => `El campo '${property}' debe contener almenos un valor.`,
	STRING_LENGTH: ({ property }: ValidationArguments, min: number, max: number): string => `El campo '${property}' debe tener una longitud minimo de '${min}' y maxima de '${max}'.`,
	NOT_ARRAY: ({ property }: ValidationArguments): string => `El campo '${property}' tiene un valor incorrecto, debe tener un formato de array`,
	NOT_STRING: ({ property, value }: ValidationArguments): string => `El campo '${property}' debe tener un formato de texto, actualmente estás enviando un formato tipo '${Util.getTypeValue(value)}'.`,
};

export const ERRORS = {
	INTERNAL_SERVER: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `Ocurrió un error interno.`,
	},
	NOT_FOUND_FROM_DATABASE: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.NOT_FOUND,
		message: `No se encontraron datos en la Base de datos`,
	},
	NOT_FOUND_FROM_PROVIDER: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.NOT_FOUND,
		message: `No se encontró ningun registro en el proveedor`,
	},
	BAD_REQUEST: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `Hubo un error en el request `,
	},
	BAD_REQUEST_IS_IT_EXISTS: (name: string): object => ({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.DUPLICATE_RECORD,
		message: `Este registro '${name}' ya ha sido guardado previamente.`,
	}),
	PATH_NOT_FOUND: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `Ruta no encontrada`,
	},
};
