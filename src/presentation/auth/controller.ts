import { Request, Response } from "express"
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto, UNEXPECTED_ERROR } from "../../domain";
import { UserModel } from "../../data/mongodb";



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


    registerUser = async ( req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({ error });

        new RegisterUser(this.authRepository)
            .execute( registerUserDto! )
            .then( data => res.json(data) )
            .catch( error => this.handleError(error, res) );
    }

    loginUser = async( req: Request, res: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.authentication(req.body);
        if( error ) return res.status(400).json({ error });
        
        new LoginUser(this.authRepository)
            .execute( loginUserDto! )
            .then( data => res.json(data) )
            .catch( error => this.handleError( error, res) );
    }

    getUsers = ( req: Request, res: Response ) => {
        UserModel.find()
            .then( users => {
                res.json({
                    // users,
                    user: req.body.user
                });
            })
            .catch( error => this.handleError( error, res ) );
    }
}