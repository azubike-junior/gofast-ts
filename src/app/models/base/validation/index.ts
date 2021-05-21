import { JSONSchema } from 'objection';

export const BaseValidation: JSONSchema = {
    type: 'object',
    title:'Base schema validation',
    properties: {
        id:{format: 'uuid'},
        created_at: {format: 'date-time'},
        updated_at: { format: 'date-time'}
    }
}