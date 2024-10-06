export interface DatabaseResult {
	fieldCount: number;
	affectedRows: number;
	insertId: number;
	info: string;
	serverStatus: number;
	warningStatus: number;
	changedRows: number;
}
