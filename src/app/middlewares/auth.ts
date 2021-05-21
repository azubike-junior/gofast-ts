import { HttpStatusCode } from './../utils/constant';
import jwt  from 'jsonwebtoken';
import { throwError, error, GenericResponse } from './../utils';
import { IJwtPayload } from './../services';
import { ApikeyService, UserService} from './../services';
import { inject, injectable } from "inversify";
import { BaseController } from "../controllers/base";
import { next, request, response } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models';


@injectable()
export class Auth extends BaseController{
    private readonly apikeyService!: ApikeyService
    private readonly userService: any

    constructor(){
        super()
        this.userService = UserModel
        this.apikeyService = new ApikeyService()
    }

    public async authenticate(@request() req: Request, @response() res: Response, @next() next:NextFunction){
    try {
      const apiSignature = Auth.extractApiSignature(req);
      const privateKey = await this.getUserPrivateKey(apiSignature);

      const [apiKey, encryptedUserId] = apiSignature.split('.');
      const decryptedUserId = this.apikeyService.decryptUserId(encryptedUserId, privateKey);

      await this.verifyApiSignature(decryptedUserId, apiKey);
      res.locals.user = await this.getUserPayload(decryptedUserId);

      next();
    } catch (e) {
      e.code = HttpStatusCode.UNAUTHORIZED;
      this.error(res, e);
    }
    }

    private decodeJwtToken = (req: Request): IJwtPayload => {
        const bearerHeader: string = req.headers.authorization as string
        if(!bearerHeader) {
            throwError('Authentication failed', error.unauthorized)
        }
        let [authBearer, token] = bearerHeader.split(' ');
        if(authBearer !== 'Bearer') {
            throwError('Authentication failed', error.unauthorized)
        }
        const jwtPayload = jwt.decode(token) as IJwtPayload;
        const {aud, role, gopai_signature, exp} = jwtPayload
        const expiringDate = new Date(exp as any * 100)
        
        if(expiringDate > new Date()) {
            token = this.apikeyService.generateJwtToken({id:aud, role, gopai_signature});
        }

        return this.apikeyService.verifyToken(token)
    }

    private  getUserPayload = async (userId: string): Promise<any> => {
        try {
            const user = await this.userService.query().where({id: userId}).first()
            if(!user){
                throwError('Authentication failed', error.unauthorized)
            }
            return user;
        }catch(e){
            throw new GenericResponse(e.messge, e.code)
        }
    }

    private static extractApiSignature(req: Request): string {
    try {
      const signatureHeader = req.headers['api-key'] as string;

      if (!signatureHeader) {
        throwError('api-key header must be provided', error.unauthorized);
      }

      return signatureHeader;
    } catch(e) {
      throw new GenericResponse(e.message, e.code);
    }
  }

    private async getUserPrivateKey(key: string): Promise<string> {
    try {
      const userProfile  = await this.userService
        .query()
        .where({ api_key: key })
        .first();

      if (!userProfile) {
        throwError('Invalid api-key', error.unauthorized);
      }

      const { secret_key: secretKey } = userProfile;

      return secretKey;
    } catch (e) {
      throw new GenericResponse(e.message, e.code);
    }
  }

  private verifyApiSignature = async (userId: string, apiKey: string): Promise<boolean> => {
    try {
      if (!userId) {
        throwError('Invalid api-key', error.unauthorized);
      }

      const userProfile = await this.userService
        .query().where({ id: userId }).first();

      if (!userProfile) {
        throwError('Invalid api-key', error.unauthorized);
      }

      const { public_key: publicKey } = userProfile;

      const isApiSignatureValid = this.apikeyService.verifyApiKey(userId, apiKey, publicKey);

      if (!isApiSignatureValid) {
        throwError('Invalid API key provided', error.unauthorized);
      }

      return isApiSignatureValid;
    } catch(e) {
      throw new GenericResponse(e.message, e.code);
    }
  }
}