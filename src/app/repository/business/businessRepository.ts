import { IfindBusiness } from './../../models';
import { GenericResponse, HttpStatusCode } from './../../utils';
import { transaction } from 'objection';
import { BusinessModel, IBusiness } from './../../models/';
import { injectable } from "inversify";

@injectable()
export class BusinessRepository {
    public async createBusiness(data: IBusiness): Promise<IBusiness> {
        try{
            return await transaction(BusinessModel, async (BusinessModel) => {
                return BusinessModel.query().insertGraphAndFetch(data)
            })
        }catch(e) {
            e.code = e.code || HttpStatusCode.INTERNAL_SERVER_ERROR;
            throw new GenericResponse(e.message, e.code);
        }
    }

    public async findOne(data: IfindBusiness): Promise<IBusiness> {
        try{
             return await transaction(BusinessModel, async (BusinessModel) => {
                return BusinessModel.query().findOne(data).withGraphFetched(`[
                    user.[

                    ]
                ]`)
            })
        }catch(e){
            e.code = e.code || HttpStatusCode.INTERNAL_SERVER_ERROR;
            throw new GenericResponse(e.message, e.code);
        }
    }

    public async findOneById(businessId: string) : Promise <IBusiness> {
        try{
             return await transaction(BusinessModel, async (BusinessModel) => {
                return BusinessModel.query().findById(businessId).withGraphFetched(`[
                    user.[

                    ]
                ]`)
            })
        }catch(e){
            e.code = e.code || HttpStatusCode.INTERNAL_SERVER_ERROR;
            throw new GenericResponse(e.message, e.code);
        }
    }

    public async updateBusiness(businessId:string, data: IBusiness): Promise<IBusiness>{
        try{
            return await transaction(BusinessModel, async (BusinessModel) => {
                return BusinessModel.query().patchAndFetchById(businessId, data)
            })
        }catch(e){
            e.code = e.code || HttpStatusCode.INTERNAL_SERVER_ERROR;
            throw new GenericResponse(e.message, e.code);
        }
    }
}