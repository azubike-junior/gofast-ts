import { IBusiness } from '../../models';
import { BusinessRepository } from '../../repository';
import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import { error, generateSlug, GenericResponse, isValidEmail, throwError } from '../../utils';


@injectable()
export class BusinessService {
    @inject(TYPES.BusinessRepository)
    private readonly businessRepo!: BusinessRepository

    public static checkBusinessRequiredFields(data: IBusiness): void {
        try{
            if(!data.business_name){
                throwError('Business name is required', error.badRequest)
            }
            if(!data.business_email){
                throwError('email address is required', error.badRequest)
            }
            if(!isValidEmail(data.business_email)){
                throwError('email address not valid', error.badRequest)
            }
            if(!data.business_type){
                throwError('business type is required', error.badRequest)
            }
            if(generateSlug(data.business_type) !== 'registered' && generateSlug(data.business_type) === 'non_registered'){
                throwError('business type must be either registered or non_registered', error.badRequest)
            }
            if(generateSlug(data.business_type) === 'registered' && !data.cac){
                throwError('cac is required for registered business', error.badRequest)
            }
            if(generateSlug(data.business_type) === 'registered' && !data.rc_number){
                throwError('rc_number is required for registered business', error.badRequest)
            }
            if(generateSlug(data.business_type) === 'registered' && !data.tax_identification_number){
                throwError('tax_identification_number is required for registered business', error.badRequest)
            }
            if(generateSlug(data.business_type) === 'registered' && !data.office_address){
                throwError('office address is required for registered business', error.badRequest)
            }
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async createBusiness(data: IBusiness): Promise<IBusiness> {
        try{
            BusinessService.checkBusinessRequiredFields(data)

            data.slug = generateSlug(data.business_name);

            let existingBusiness = await this.businessRepo.findOne({slug: data.slug})
            if(existingBusiness){
                throwError('Business wtih the name already exists', error.badRequest)
            }
            existingBusiness = await this.businessRepo.findOne({business_email: data.business_email})
            if(existingBusiness){
                throwError('Business with the email already exists', error.badRequest)
            }

            data.is_verified = false;

            return await this.businessRepo.createBusiness(data)
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async getBusinessById(id: string): Promise<IBusiness> {
        try{
             return await this.businessRepo.findOneById(id)
        }catch(e) {
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async updateBusiness(businessId: string, data: IBusiness): Promise<IBusiness> {
        try{
            let existingBusiness;
            if(data.business_name){
                existingBusiness = await this.businessRepo.findOne({slug: generateSlug(data.business_name)})
                if(existingBusiness){
                    if(existingBusiness.user_id === data.user_id){
                        throwError('Provide a new business_name', error.badRequest)
                    }
                    throwError('Business with the name already exists', error.badRequest
                     )
                }
                data.slug = generateSlug(data.business_name)
            }
            if(data.business_email){
                existingBusiness = await this.businessRepo.findOne({business_email: data.business_email})
                if(existingBusiness){
                    if(existingBusiness.user_id === data.user_id){
                        throwError('Provide a new business_email', error.badRequest)
                    }
                    throwError('Business with the email already exist', error.badRequest);
                }
            }
            return await this.businessRepo.updateBusiness(businessId, data)
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }
}