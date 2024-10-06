export const MySQL_QUERIES = {
	CREATE: ' INSERT INTO peoples SET ? ; ',
	GET_BY_NAME:
		'SELECT ' +
		'`id`, `name`, `height`, `mass`, `hair_color`, ' +
		'`skin_color`, `eye_color`, `birth_year`, `gender`, `films`, ' +
		'`homeworld`, `starships` , `species`, ' +
		'`vehicles`, `edited`, `url`, `created` ' +
		'FROM peoples WHERE `name` = ?;',
	VERIFY_IS_EXIST: 'SELECT `id` FROM peoples WHERE `name` = ?;',
};
