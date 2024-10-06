import { Pool } from 'mysql2/promise';

export interface ConnectionDatabase {
	pool(): Pool;
}
