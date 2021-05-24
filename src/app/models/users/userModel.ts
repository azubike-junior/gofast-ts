import { userValidation } from './validation';
import { JSONSchema, RelationMappings } from 'objection';
import { Schema, Table } from './../../../database';
import { IUser } from './interfaces';
import { BaseModel } from './../base';

export class UserModel extends BaseModel implements IUser {
    public dob: IUser['dob'];
    public role!: IUser['role'];
    public email!: IUser['email'];
    public phone!: IUser['phone'];
    public state: IUser['state'];
    public gender: IUser['gender'];
    public status!: IUser['status'];
    public url_id: IUser['url_id'];
    public country!: IUser['country'];
    public password: IUser['password'];
    public last_name!: IUser['last_name'];
    public wallet_id: IUser['wallet_id'];
    public deleted_at: IUser['deleted_at'];
    public first_name!: IUser['first_name'];
    public last_login: IUser['last_login'];
    public public_key: IUser['public_key'];
    public secret_key: IUser['secret_key'];

    static get tableName(): string {
        return `${Schema.gopai}.${Table.users}`
    }

    static get jsonSchema(): JSONSchema {
        return userValidation
    }

    static get hidden(): string[] {
        return ['secret_key', 'public_key', 'url_id', 'wallet_id']
    }

    // static get relationMappings (): RelationMappings {
    //     return {
    //         business: {
    //             relation: BaseModel.HasManyRelation,
    //             modelClass: '../businesses',
    //             join: {
    //                 from: `${Schema.gopai}.${Table.users}.id`,
    //                 to: `${Schema.gopai}.${Table.business}.user_id`
    //             }
    //         }
    //     }
    // }
}