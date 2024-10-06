import { createPool, Pool } from 'mysql2/promise';
import { ConnectionDatabase } from '../../connection.database';
import { ConfigDatabase } from '../../../interfaces';

export class ConnectionMysqlDatabase implements ConnectionDatabase {
	public pools: Pool;

	constructor(public dbConfig: ConfigDatabase) {
		this.pools = createPool(dbConfig);
	}

	pool(): Pool {
		return this.pools;
	}
}
