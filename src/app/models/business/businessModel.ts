import { JSONSchema, RelationMappings } from 'objection';
import { Table } from './../../../database';
import { Schema } from './../../../database';
import { IBusiness } from './interface';
import { BaseModel } from './../base';
import { businessValidation } from './validation';

export class BusinessModel extends BaseModel implements IBusiness {
    public business_name!: IBusiness['business_name']
    public business_email!: IBusiness['business_email']
    public business_type!: IBusiness['business_type']
    public user_id!: IBusiness['user_id']
    public cac: IBusiness['cac']
    public certificate_memorandum: IBusiness['certificate_memorandum']
    public rc_number: IBusiness['rc_number']
    public business_info!: IBusiness['business_info']
    public slug!: IBusiness['slug']
    public is_verified: IBusiness['is_verified']
    public tax_identification_number: IBusiness['tax_identification_number']
    public currency: IBusiness['currency']
    public website_address!: IBusiness['website_address']
    public office_address: IBusiness['office_address']

    static get tableName(): string {
        return `${Schema.gopai}.${Table.business}`
    }

    static get jsonSchema(): JSONSchema {
        return businessValidation
    }

    static get hidden(): string[] {
        return ['user_id']
    }

    // static get relationMappings(): RelationMappings {
    //     return {
    //         user: {
    //             relation: BaseModel.BelongsToOneRelation,
    //             modelClass: '../users',
    //             join: {
    //                 from: `${Schema.gopai}.${Table.business}.user_id`,
    //                 to: `${Schema.gopai}.${Table.users}.id`
    //             }
    //         }
    //     }
    // }
}