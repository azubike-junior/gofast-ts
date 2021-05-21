import { GenericResponse } from './../../utils/errrors';
import { HttpStatusCode } from './../../utils/constant';
import { IUser, IFindUser, UserModel } from './../../models';
import { injectable } from "inversify";
import { transaction } from 'objection';

@injectable()
export class UserRepository {
    public async create(data: IUser): Promise<IUser> {
        try{
            return await transaction(UserModel, async (UserModel) => {
                return UserModel.query().insertGraphAndFetch(data)
            })
        }catch(e){
            e.code || HttpStatusCode.INTERNAL_SERVER_ERROR;
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async findOne(data: IFindUser): Promise<IUser> {
        try{
            return await transaction(UserModel, async (UserModel) => {
                return UserModel.query().where(data).withGraphFetched(`[
                    business
                ]`).first()
            })
        }catch(e){
            if(typeof e.code === 'string' || !e.code){
                e.code = HttpStatusCode.INTERNAL_SERVER_ERROR
            }
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async findOneById(id: string): Promise<IUser> {
        try{
            return await transaction(UserModel, async (UserModel) => {
                return UserModel.query().where({id}).withGraphFetched(`[
                    business
                ]`).first()
            })
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async getUserPublicKey(key: string): Promise<string> {
        try{
            const {public_key} = await UserModel.query()
            .select('public_key')
            .where({api_key: key})
            .first();

            return public_key!
        }catch(e){
             throw new GenericResponse(e.message, e.code)
        }
    }

    public async getUserSecretKey(key: string): Promise<string> {
        try{
            const {secret_key} = await UserModel.query()
            .select('secret_key')
            .where({api_key: key})
            .first();

            return secret_key!
        }catch(e){
             throw new GenericResponse(e.message, e.code)
        }
    }
}
