import { inject, injectable } from 'inversify';
import { $log } from 'ts-log-debug';
import { StarwarsService } from '../starwars.service';
import TYPES from '../../types';
import { DatabaseRepository } from '../../repository/database.repository';
import DataMapper from '../../mapper/data.mapper';

@injectable()
export default class StarwarsServiceImpl implements StarwarsService {
	// @ts-ignore
	constructor(@inject(TYPES.DatabaseRepository) private tokenRepository: DatabaseRepository, @inject(TYPES.DataMapper) private tokenMapper: DataMapper) {}

	public async create(data: any): Promise<any> {
		$log.info(`function create`);
		await this.tokenRepository.create({});
		return this.tokenMapper.mapperr(data);
	}
}
