export interface SwapiProvider {
	get(data: any): Promise<any>;
	post(data: any): Promise<any>;
}
