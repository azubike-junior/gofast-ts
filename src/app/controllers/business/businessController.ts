import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import TYPES from "../../config/types";
import { Auth } from "../../middlewares";
import { IBusiness } from "../../models";
import { BusinessService } from "../../services";
import { HttpStatusCode } from "../../utils";
import { BaseController } from "../base";

const {authenticate} = new Auth()

@controller('/business')
export class BusinessController extends BaseController{
    @inject(TYPES.BusinessService)
    private readonly businessService!: BusinessService

    @httpPost('/', authenticate)
    public async createBusiness(@request() req: Request, @response() res: Response){
        try{    
            const business: IBusiness = await this.businessService.createBusiness(req.body)
            this.success(res, business, 'business created successfully', HttpStatusCode.CREATED)
        }catch(e){     
            this.error(res, e)
        }
    }

    @httpGet('/:id', authenticate)
    public async findBusinessById(@request() req: Request, @response() res: Response){
        try{    
            const {id} = req.params
            const business: IBusiness = await this.businessService.getBusinessById(id)
            this.success(res, business, 'business retrieved successfully')
        }catch(e){     
            this.error(res, e)
        }
    }

    @httpPut('/:id', authenticate)
      public async updateBusiness(@request() req: Request, @response() res: Response){
        try{    
            const {id} = req.params
            const {id: userId} = res.locals.user
            const businessUpdateData = req.body;

            businessUpdateData.id = userId

            const business: IBusiness = await this.businessService.updateBusiness(id, businessUpdateData)
            this.success(res, business, 'business updated successfully')
        }catch(e){     
            this.error(res, e)
        }
    }
}