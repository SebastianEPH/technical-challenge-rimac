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
	DATA_MAPPER = 'Data Mapper | ',
	PROVIDER = 'Provider | ',
	API_CONNECTOR = 'Api Connector | ',
}
export enum NAME {
	CREATE = 'create() | ',
	GET = 'get() | ',
	PARSE_PEOPLE = 'parsePeople() | ',
	PARSE_STATUS_CODE = 'parseStatusCode() | ',
}
export enum TIMEOUT {
	PROVIDER = 7001,
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
