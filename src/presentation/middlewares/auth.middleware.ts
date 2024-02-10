import { Response, Request, NextFunction } from "express";
import { INVALID_TOKEN, NOT_TOKEN, UNEXPECTED_ERROR } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";



export class AuthMiddleware {


    static validateJWT = async( req: Request, res: Response, next: NextFunction ) => {

        const authorization = req.header('Authorization');
        if( !authorization ) return res.status(401).json({ ErrorAuthorization: NOT_TOKEN});
        if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ ErrorAuthorization: INVALID_TOKEN });


        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ username: string, role: string }>(token);
            if( !payload ) return res.status(401).json({ ErrorAuthorization: INVALID_TOKEN });

            const user = await UserModel.findOne({ username: payload.username });
            if( !user ) return res.status(401).json({ ErrorAuthorization: INVALID_TOKEN })

            req.body.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ ErrorServer: UNEXPECTED_ERROR });   
        }
    }


}