import { BusinessRepository } from './../repository/business/businessRepository';
import { UserRepository } from './../repository/users/userRepository';
import { UserService, BusinessService, ApikeyService } from './../services';
import {Container} from 'inversify';
import 'reflect-metadata'
import { UserController, BusinessController } from '../controllers/';
import TYPES from './types';

const container = new Container()

//controllers
container
.bind<UserController>(TYPES.UserController)
.to(UserController)
.inSingletonScope()
container
.bind<BusinessController>(TYPES.BusinessController)
.to(BusinessController)
.inSingletonScope();

//services
container
.bind<UserService>(TYPES.UserService)
.to(UserService)
.inSingletonScope()
container
.bind<BusinessService>(TYPES.BusinessService)
.to(BusinessService)
.inSingletonScope()
container
.bind<ApikeyService>(TYPES.ApiKeyService)
.to(ApikeyService)
.inSingletonScope();

//repository 
container
.bind<UserRepository>(TYPES.UserRepository)
.to(UserRepository)
.inSingletonScope()
container
.bind<BusinessRepository>(TYPES.BusinessRepository)
.to(BusinessRepository)
.inSingletonScope()


export default container;