import { HttpStatusCode } from './constant';

export class GenericResponse extends Error {
    constructor(
        readonly message: string,
        readonly code: number
    ){
        super(message)
    }
}

export class InternalServerError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.INTERNAL_SERVER_ERROR
    ){
        super(message)
    }
}

export class NotFoundError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.NOT_FOUND
    ){
        super(message)
    }
}

export class ForbiddenError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.FORBIDDEN
    ){
        super(message)
    }
}

export class UnauthorizedError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.UNAUTHORIZED
    ){
        super(message)
    }
}

export class BadRequestError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.BAD_REQUEST
    ){
        super(message)
    }
}

export class ConflictError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.CONFLICT
    ){
        super(message)
    }
}

export class BadGatewayError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.BAD_GATEWAY
    ){
        super(message)
    }
}

export class ServiceUnavailableError extends Error {
     constructor(
        readonly message: string,
        readonly code = HttpStatusCode.SERVICE_UNAVAILABLE
    ){
        super(message)
    }
}

export class PaymentRequiredError extends Error {
  constructor(
    readonly message: string,
    readonly code = HttpStatusCode.PAYMENT_REQUIRED,
  ) {
    super(message);
  }
}

export class UnsupportedMediaTypeError extends Error {
  constructor(
    readonly message: string,
    readonly code = HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
  ) {
    super(message);
  }
}

interface ErrorConstructor {
    new(message: string, code?: number): Error;
}

export const error = {
  notFound: NotFoundError,
  internalServer: InternalServerError,
  unauthorized: UnauthorizedError,
  badRequest: BadRequestError,
  forbidden: ForbiddenError,
  conflict: ConflictError,
  serviceUnavailable: ServiceUnavailableError,
  badGateway: BadGatewayError,
  paymentRequired: PaymentRequiredError,
  unsupportedMediaType: UnsupportedMediaTypeError,
}

export const throwError = (message: string, ErrorType:ErrorConstructor) => {
    throw new ErrorType(message)
}