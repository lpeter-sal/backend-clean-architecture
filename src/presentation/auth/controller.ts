import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto, UNEXPECTED_ERROR } from "../../domain";
import { JwtAdapter } from "../../config";
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

        this.authRepository.register(registerUserDto!)
            .then( async(user) => {
                res.json({
                    user,
                    token: await JwtAdapter.genereteToken({ username: user.username, roles: user.role })
                });
            })
            .catch( error => this.handleError( error, res ) );
    }

    loginUser = ( req: Request, res: Response ) => {
        res.json('LoginUser controller')
    }

    getUsers = ( req: Request, res: Response ) => {
        console.log(req.body.payload);
        UserModel.find()
            .then( users => {
                res.json({
                    // users,
                    token: req.body.payload
                });
            })
            .catch( error => this.handleError( error, res ) );
    }


}