const MysqlQueries = {
	create: 'INSERT INTO peoples SET ?;',
	get: 'SELECT `id`, `name`, `height`, `mass`, `hair_color`, `skin_color`, `eye_color`, `birth_year`, `gender`, `homeworld`, `create`, `edited`, `url`, `created_at` FROM peoples;',
};
export default MysqlQueries;
