import { ERROR_OBJECT, ERROR_TYPE, PARAMS } from '../../utils/enum';

const ERRORS = {
	INTERNAL_SERVER: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `Ocurrió un error interno.`,
	},
	NOT_FOUND_FROM_DATABASE: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `No se encontraron datos en la Base de datos`,
	},
	NOT_FOUND_FROM_PROVIDER: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `No se encontró ningun registro en el proveedor`,
	},
	BAD_REQUEST: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `Hubo un error en el request `,
	},
	PATH_NOT_FOUND: {
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.API,
		message: `Ruta no encontrada`,
	},
	VALIDATOR_PARAMS_NAME: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.NOMBRE} tiene un formato inválido o no existe`,
		param: PARAMS.NOMBRE,
	}),
	VALIDATOR_PARAMS_HEIGHT: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.ALTURA} tiene un formato inválido o no existe`,
		param: PARAMS.ALTURA,
	}),
	VALIDATOR_PARAMS_MASS: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.MASA} tiene un formato inválido o no existe`,
		param: PARAMS.MASA,
	}),
	VALIDATOR_PARAMS_HAIR_COLOR: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.COLOR_DEL_CABELLO} tiene un formato inválido o no existe`,
		param: PARAMS.COLOR_DEL_CABELLO,
	}),
	VALIDATOR_PARAMS_SKIN_COLOR: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.COLOR_DE_PIEL} tiene un formato inválido o no existe`,
		param: PARAMS.COLOR_DE_PIEL,
	}),
	VALIDATOR_PARAMS_EYE_COLOR: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.COLOR_DE_OJOS} tiene un formato inválido o no existe`,
		param: PARAMS.COLOR_DE_OJOS,
	}),
	VALIDATOR_PARAMS_BIRTH_YEAR: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.COLOR_DE_OJOS} tiene un formato inválido o no existe`,
		param: PARAMS.COLOR_DE_OJOS,
	}),
	VALIDATOR_PARAMS_GENDER: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.GENERO} tiene un formato inválido o no existe`,
		param: PARAMS.GENERO,
	}),
	VALIDATOR_PARAMS_HOME_WORLD: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.PLANETA_NATAL} tiene un formato inválido o no existe`,
		param: PARAMS.PLANETA_NATAL,
	}),

	VALIDATOR_PARAMS_URL: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.URL} tiene un formato inválido o no existe`,
		param: PARAMS.URL,
	}),
	VALIDATOR_PARAMS_FILMS: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.PELICULAS} tiene un formato inválido o no existe`,
		param: PARAMS.PELICULAS,
	}),
	VALIDATOR_PARAMS_ESPECIES: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.ESPECIES} tiene un formato inválido o no existe`,
		param: PARAMS.ESPECIES,
	}),
	VALIDATOR_PARAMS_VEHICLES: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.VEHICULOS} tiene un formato inválido o no existe`,
		param: PARAMS.VEHICULOS,
	}),
	VALIDATOR_PARAMS_STARTSHIPS: JSON.stringify({
		object: ERROR_OBJECT.ERROR,
		type: ERROR_TYPE.PARAMETER_ERROR,
		message: `El valor ${PARAMS.NAVES_ESTEREALES} tiene un formato inválido o no existe`,
		param: PARAMS.NAVES_ESTEREALES,
	}),
};

export default ERRORS;
