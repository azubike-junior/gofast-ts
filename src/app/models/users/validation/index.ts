import { JSONSchema } from 'objection';

export const userValidation: JSONSchema = {
    type: 'object',
    title:'User schema validation',
      required: [
    'first_name',
    'last_name',
    'email',
    'password',
    'role',
    'phone',
    'country',
    'wallet_id',
    'secret_key',
    'public_key',
    'api_key'
  ],
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    email: { type: 'string' },
    last_login: { format: 'date-time' },
    dob: { format: 'date' },
    role: { type: 'string' },
    phone: { type: 'string' },
    password: { type: 'string' },
    state: { type: 'string' },
    country: { type: 'string' },
    status: { type: 'boolean' },
    url_id: { type: 'string' },
    wallet_id: { type: 'string' },
    secret_key: { type: 'string' },
    public_key: { type: 'string' },
    api_key: { type: 'string' },
    deleted_at: { format: 'date-time' },
  }

}