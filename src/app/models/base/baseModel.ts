import { BaseValidation } from './validation/index';
import { IBase } from './interface/index';
import { Knex } from 'knex';
import  visibilityPlugin from 'objection-visibility';
import {JSONSchema, Model} from 'objection'

Model.knex(Knex);

export class BaseModel extends visibilityPlugin(Model) implements IBase {
    public id: IBase['id']
    public created_at: IBase['created_at']
    public updated_at: IBase['updated_at']

    $beforeInsert(){
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    $beforeUpdate(){
        this.updated_at = new Date()
    }

    static get modelPaths(): string[] {
        return [__dirname]
    }

    static get JsonSchema(): JSONSchema {
        return BaseValidation
    }
}