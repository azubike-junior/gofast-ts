import { HttpStatusCode, GenericResponse } from './../../utils';
import { Response } from 'express';
import { injectable } from 'inversify';


@injectable()
export abstract class BaseController {
    protected success(res: Response, data: any = [], message: string, httpStatus: number = HttpStatusCode.OK){
        return res.status(httpStatus).send({
            status: 'success',
            message, 
            data
        })
    }

    protected error(res:Response, e: GenericResponse){
        const {message, code} = e;
        return res.status(code).send({
            status: 'error',
            message
        })
    }
}