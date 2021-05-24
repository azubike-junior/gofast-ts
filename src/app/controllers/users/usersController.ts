import { HttpStatusCode } from './../../utils/constant';
import { IUser } from './../../models';
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import TYPES from "../../config/types";
import { UserService } from "../../services";
import { BaseController } from "../base";
import {Auth} from '../../middlewares'

const {authenticate} = new Auth()


@controller('/users')
export class UserController extends BaseController {
    @inject(TYPES.UserService)
    private readonly userService! : UserService

    @httpPost('/')
    public async register(@request() req: Request, @response() res: Response){
        try{
            const user: IUser = await this.userService.registerUser(req.body)
            console.log('========', user)
            this.success(res, user, 'User created successfully', HttpStatusCode.CREATED)
        }catch(e){
            console.log(e)
            this.error(res, e)
        }
    }

    @httpPost('/login')
    public async login(@request() req: Request, @response() res: Response){
        try {
            const {email, password} = req.body;
            const user: IUser = await this.userService.loginUser(email, password)
            this.success(res, user, 'User logged in Successfully')
        }catch(e){
            this.error(res, e)
        }
    }

    @httpGet('/:id', authenticate)
    public async getUser(@request() req: Request, @response() res: Response){
        try {
            const {id} = req.params;
            const user: IUser = await this.userService.getUserById(id)
            this.success(res, user, 'User profile retrieved successfully')
        }catch(e){
            this.error(res, e)
        }
    }
}