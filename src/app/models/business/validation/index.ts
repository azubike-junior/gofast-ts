import { JSONSchema } from 'objection';

export const businessValidation: JSONSchema  = {
    title: 'Business Validation',
    type: 'object',
    required: [
        'business_name',
        'business_type',
        'business_email',
        'slug',
        'is_verfied'
    ],
    properties: {
        business_name: { type: 'string' },
        slug: { type: 'string' },
        business_email: { type: 'string' },
        tax_identification_number: { type: 'string' },
        rc_number: { type: 'string' },
        is_verified: { type: 'boolean' },
        website_address: { type: 'string' },
        office_address: { type: 'string' },
        business_info: { type: 'string' },
        user_id: { format: 'uuid' },
        certification_memorandum: {
            type: 'string',
            contentEncoding: 'binary'
        },
        cac: { type: 'string' },
        business_type: {
            type: 'string',
            enum: ['registered', 'non_registered']
        },
    }
}