export interface DatabaseRepository {
	create(data: any): Promise<any>;
}
