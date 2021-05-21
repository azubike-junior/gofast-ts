import {IBase} from '../../base'

export interface IUser extends IBase {
    first_name: string;
    last_name: string;
    email: string;
    gender?: string;
    last_login?: Date;
    dob?: Date;
    role: string;
    phone: string;
    password?: string;
    state?: string;
    country: string;
    status: boolean;
    url_id?: string;
    wallet_id?: string;
    secret_key?: string;
    public_key?: string;
    api_key?: string
    deleted_at?: Date;
    wallets?: string;
    business?: string[];
    transactions?: string[];
    urls?: string;
    bank_details?: string[];
}

export interface IFindUser extends IBase {
    first_name?: string;
    last_name?: string;
    email?: string;
    gender?: string;
    last_login?: Date;
    dob?: Date;
    role?: string;
    phone?: string;
    state?: string;
    country?: string;
    status?: boolean;
}