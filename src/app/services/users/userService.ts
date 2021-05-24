import { IUser } from './../../models';
import { ApikeyService } from './../apiKeys';
import { UserRepository } from './../../repository';
import { inject, injectable } from "inversify";
import TYPES from "../../config/types";
import {v4 as uuid} from 'uuid'
import { error, Password, throwError, GenericResponse } from '../../utils';

@injectable()
export class UserService {
    @inject(TYPES.UserRepository)
    private readonly userRepo! : UserRepository
    @inject(TYPES.ApiKeyService)
    private readonly apiKeyService! : ApikeyService

    public async registerUser(data: IUser): Promise<any> {
        try {
            //generate userId
            const userId = uuid();

            //generate and sign key
            const {publicKey:public_key, privateKey:secret_key} = this.apiKeyService.generateKeyPair();
       
            const api_key = this.apiKeyService.signApiKey(userId, secret_key, public_key)

            const user: IUser | any = {
                ...data,
                password: await Password.hash(data.password!),
                public_key,
                secret_key,
                api_key,
                id: userId
            }

            console.log('======user', user)

            let existingUser: IUser = await this.userRepo.findOne({email: data.email});

            console.log('===== existing,', existingUser)
            if(existingUser) {
                throwError(`User with the email: ${data.email} already exist!`, error.badRequest )
            }

            existingUser = await this.userRepo.findOne({phone: data.phone});
            if(existingUser) {
                throwError(`User with the phone: ${data.phone} already exist!`, error.badRequest)
            }

            const newUser: IUser = await this.userRepo.create(user)

            const token = this.apiKeyService.generateJwtToken({
                id: newUser.id as string,
                gopai_signature: api_key,
                role: newUser.role
            })

            return {
                user: newUser,
                auth_token: token
            }
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async loginUser(email:string, password:string): Promise<any> {
        try {
            const user:IUser = await this.userRepo.findOne({email})

            if(user){
                throwError('invalid login credential', error.badRequest)
            }
            
            const isMatchPassword = await Password.compare(password, user.password!);

            if(!isMatchPassword){
                throwError('invalid login credential', error.badRequest)
            }

            //delete user secret keys
            delete user.password;
            delete user.secret_key
            delete user.api_key
            delete user.public_key
            delete user.wallet_id
            delete user.url_id

            const token = this.apiKeyService.generateJwtToken({
                id: user.id as string,
                gopai_signature: user.api_key!,
                role: user.role
            })

            return {
                user,
                auth_token: token
            }
        }catch(e){
             throw new GenericResponse(e.message, e.code)
        }
    }   

    public async getUserById(id: string): Promise<any> {
        try{
            return await this.userRepo.findOneById(id);
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }

    public async getUserSecretKey(key: string): Promise<any> {
        try{
            return await this.userRepo.getUserSecretKey(key)
        }catch(e){
            throw new GenericResponse(e.message, e.code)
        }
    }

}
