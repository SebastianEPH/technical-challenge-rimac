export enum HTTP {
	STATUS_CODE_201 = 201,
	STATUS_CODE_200 = 200,
	STATUS_CODE_400 = 400,
	STATUS_CODE_401 = 401,
	STATUS_CODE_403 = 403,
	STATUS_CODE_404 = 404,
	STATUS_CODE_500 = 500,
}
export enum HEADERS {
	APPLICATION = 'Application',
	CONTENT_TYPE = 'Content-Type',
	USER_AGENT = 'User-Agent',

	ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
	ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
	ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
}
export enum HEADERS_VALUE {
	ALLOW = '*',
	APPLICATION_JSON = 'application/json',
}
export enum HOST {
	SWAPI = 'https://swapi.py4e.com',
}
export enum NAME_TYPE {
	SERVICE = 'Service | ',
	HANDLER = 'handler | ',
	REPOSITORY_MYSQL = 'Repository(MYSQL) | ',
	DATA_MAPPER = 'Data Mapper | ',
	PROVIDER = 'Provider | ',
	API_CONNECTOR = 'Api Connector | ',
}
export enum NAME {
	CREATE = 'create() | ',
	GET_BY_NAME = 'getByName() | ',
	PARSE_PEOPLE_FROM_SWAPI = 'parsePeopleFromSwapi() | ',
	PARSE_PEOPLE_FROM_DATABASE = 'parsePeopleFromDatabase() | ',
	PARSE_STATUS_CODE = 'parseStatusCode() | ',
}
export enum TIMEOUT {
	PROVIDER = 7001,
}
export enum TYPE_OF {
	OBJECT = 'object',
}
export enum POSITION {
	ZERO = 0,
	FIRST = 1,
	SECOND = 2,
	THIRD = 3,
	FOURTH = 4,
	FIFTH = 5,
	SIXTH = 6,
	SEVENTH = 7,
	EIGHTH = 8,
	NINTH = 9,
	TENTH = 10,
}
export enum NUM {
	ZERO = 0,
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
	NINE = 9,
	TEN = 10,
	TWELVE = 12,
	THIRTEEN = 13,
	SIXTEEN = 16,
	NINE_TEEN = 19,
	TWENTY_FIVE = 25,
	FIFTY = 50,
	ONE_HUNDRED = 100,
	TEN_THOUSND = 10000,
}
export enum CURRENT_ENV {
	LOCAL = 'LOCAL',
	PRODUCTION = 'PROD',
}
export enum ENV {
	DATABASE_MYSQL_HOST = 'DATABASE_MYSQL_HOST',
	MYSQL_ROOT_PASSWORD = 'MYSQL_ROOT_PASSWORD',
	DATABASE_MYSQL_NAME = 'DATABASE_MYSQL_NAME',
	DATABASE_MYSQL_USER = 'DATABASE_MYSQL_USER',
	DATABASE_MYSQL_PASSWORD = 'DATABASE_MYSQL_PASSWORD',
	DATABASE_MYSQL_PORT = 'DATABASE_MYSQL_PORT',
}
