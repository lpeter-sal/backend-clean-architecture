import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { UNEXPECTED_ERROR } from '../../errors/error.catalog';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
    token: string;
    user: {
        id: string;
        username: string;
        name : string;
    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


interface LoginUserUseCase {

    execute( loginUserDto: LoginUserDto ): Promise<UserToken>
}


export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.genereteToken,
    ) {}


    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        
        // Crear usuario
        const user = await this.authRepository.login( loginUserDto );

        // Token
        const token = await this.signToken({ username: user.username, roles: user.role }, '2h');
        if( !token ) throw CustomError.internalServer({ ErrorServer: UNEXPECTED_ERROR });

        return {
            token: token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name
            }
        }
    }
}


