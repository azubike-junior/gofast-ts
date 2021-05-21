const TYPES = {
    //controllers
    HealthController: Symbol('HealthController'),
    UserController: Symbol('UserController'),
    BusinessController: Symbol('BusinessController'),

    //services
    UserService: Symbol('UserService'),
    ApiKeyService: Symbol('ApiKeyService'),
    BusinessService: Symbol('BusinessService'),

    //repositories
    UserRepository: Symbol('UserRepository'),
    BusinessRepository: Symbol('BusinessRepository')
}

export default TYPES;