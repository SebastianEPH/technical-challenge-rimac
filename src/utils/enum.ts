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
	SWAPI = '',
}
export enum NAME_TYPE {
	SERVICE = 'Service | ',
	HANDLER = 'handler | ',
	MAPPER = 'Mapper | ',
	API_CONNECTOR = 'Api Connector | ',
}
export enum NAME {
	CREATE = 'create() | ',
	GET = 'get() | ',
}
export enum TIMEOUT {
	PROVIDER = 7001,
}
