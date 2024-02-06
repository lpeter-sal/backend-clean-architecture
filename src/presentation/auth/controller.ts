import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto, UNEXPECTED_ERROR } from "../../domain";



export class AuthController {

    // INJECCION DE DEPENDENCIAS
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    private handleError = ( error: unknown, res: Response ) => {
        if( error instanceof CustomError ) {
            return res.status(error.statusCode).json( { ErrorRequest: error.errorObject } );
        }

        console.log(error);
        return res.status(500).json({ ErrorServer: UNEXPECTED_ERROR });
    }


    registerUser = ( req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then( user => res.json(user) )
            .catch( error => this.handleError( error, res ) );
    }

    loginUser = ( req: Request, res: Response ) => {
        res.json('LoginUser controller')
    }


}