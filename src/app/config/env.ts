require('dotenv').config();

export interface IEnv {
    port: number;
    environment: string;
    pg_port: number;
    pg_user: string;
    pg_host: string;
    pg_password: string;
    pg_db_name: string;
    jwt_secret_key: string;
    pg_test_user: string;
    pg_test_password: string,
    pg_test_db_name: string,
    pg_test_host: string,
    pg_test_port: number,
    crypto_key_pair_secret: string
}

const config: IEnv = {
    port : Number(process.env.port),
    environment: process.env.environment as string,
    pg_port: Number(process.env.pg_port),
    pg_host: process.env.pg_host as string,
    pg_user: process.env.pg_user as string,
    pg_password: process.env.pg_password as string,
    pg_db_name: process.env.pg_db_name as string,
    jwt_secret_key: process.env.jwt_secret_key as string,
    pg_test_db_name: process.env.pg_test_db_name as string,
    pg_test_host: process.env.pg_test_host as string,
    pg_test_user: process.env.pg_test_user as string,
    pg_test_password: process.env.pg_test_password as string,
    pg_test_port: Number(process.env.pg_test_port),
    crypto_key_pair_secret: process.env.crypto_key_pair_secret as string
}

export class Env {
    static all(){
        return config
    }
}
