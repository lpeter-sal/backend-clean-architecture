import { UNEXPECTED_ERROR } from "./error.catalog";


export class CustomError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly errorObject: object
    ) {
        super();
    }

    static badRequest( erroObject: object){
        return new CustomError(400, erroObject);
    }

    static unauthorized( erroObject: object){
        return new CustomError(401, erroObject);
    }

    static forbidden( erroObject: object){
        return new CustomError(403, erroObject);
    }

    static notFound( erroObject: object){
        return new CustomError(404, erroObject);
    }

    static internalServer( erroObject: object = UNEXPECTED_ERROR ){
        return new CustomError(500, erroObject);
    }
    
}