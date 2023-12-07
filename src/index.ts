import 'reflect-metadata';
import { Handler } from 'aws-lambda';
import { Container } from 'inversify';
import TYPES from './types';
import StarwarsHandler from './handler/starwars.handler';
import { createContainer } from './container';
import ResponseVO from './models/response.vo';

const container: Container = createContainer();

export const handlerCreate: Handler = async (event: any, context: any): Promise<ResponseVO> => {
	context.callbackWaitsForEmptyEventLoop = false;
	const tokenController: StarwarsHandler = container.get<StarwarsHandler>(TYPES.StarWarsHandler);
	return tokenController.create(event);
};

export const handlerGet: Handler = async (event: any, context: any): Promise<ResponseVO> => {
	context.callbackWaitsForEmptyEventLoop = false;
	const tokenController: StarwarsHandler = container.get<StarwarsHandler>(TYPES.StarWarsHandler);
	return tokenController.create(event);
};
