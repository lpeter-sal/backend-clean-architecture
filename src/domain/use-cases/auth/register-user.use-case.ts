import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
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


interface RegisterUserUseCase {

    execute( RegisterUserDto: RegisterUserDto ): Promise<UserToken>
}


export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.genereteToken,
    ) {}


    async execute(RegisterUserDto: RegisterUserDto): Promise<UserToken> {
        
        // Crear usuario
        const user = await this.authRepository.register( RegisterUserDto );

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


