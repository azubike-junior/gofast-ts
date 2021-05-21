import knex from 'knex';
import {Env} from './env';

const {environment: env} = Env.all();

const config = require('../../../knexfile')[env]

const db = knex(config)

export class PostgresConnection {
    static getDb () {
        return db
    }
}