import { IBase } from './../../base';

export interface IBusiness extends IBase{
    business_name : string;
    slug:           string
    business_email: string
    tax_identification_number?: string
    rc_number?:      string
    is_verified?:    boolean
    website_address: string
    office_address?: string
    business_info:  string
    currency?:       string
    cac?:            string
    user_id:        string
    business_type:  string
    certificate_memorandum?: Buffer
}

export interface IfindBusiness {
    business_name?: string;
    slug?:           string
    business_email?: string
    tax_identification_number?: string
    rc_number?:      string
    is_verified?:    boolean
    website_address?: string
    office_address?: string
    business_info?:  string
    currency?:       string
    cac?:            string
    user_id?:        string
    business_type?:  string
    certificate_memorandum?: Buffer
}