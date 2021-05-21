import knex from 'knex';
import {Env} from './src/app/config/env';

const {
    pg_db_name,
    pg_host,
    pg_user,
    pg_password,
    pg_port,
    pg_test_db_name,
    pg_test_host,
    pg_test_user,
    pg_test_password,
    pg_test_port,
    environment
} = Env.all();

interface KnexConfig {
    [name: string]: {}
}

interface Connection {
    host?: string,
    socketPath?:String,
    user: string,
    password: string,
    database: string,
    port: number,
}

let connection: Connection = {
    host: pg_host,
    user: pg_user,
    password: pg_password,
    database: pg_db_name,
    port: pg_port
}

if(environment === 'test' || environment === 'testing') {
    connection = {
        host: pg_test_host,
        user: pg_test_user,
        password: pg_test_password,
        database: pg_test_db_name,
        port: pg_test_port
    }
}

const config = {
    client: 'pg',
    connection,
    pool: {
        min: 2,
        max: 10
    },
    migrations : {
        directory: './src/database/migrations',
        tableName: 'gopay-services',
        extension: 'ts'
    },
    seeds : {
        directory: './src/database/seeds',
        extension: 'ts'
    }
}

const KnexConfiguration: KnexConfig = {
    development : config,

    staging: config,

    production: config,
    
    test : {...config, debug: true}
}

export default KnexConfiguration