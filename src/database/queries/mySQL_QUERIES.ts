const MySQL_QUERIES = {
	CREATE: 'INSERT INTO peoples SET ?;',
	GET_BY_NAME: 'SELECT `id`, `name`, `height`, `mass`, `hair_color`, `skin_color`, `eye_color`, `birth_year`, `gender`, `homeworld`,  `edited`, `url`, `created` FROM peoples WHERE `name` = ?;',
};
export default MySQL_QUERIES;
