import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, INVALID_REQUEST, LoginUserDto, REGISTERED_USER, RegisterUserDto, USER_CREDENTIALS, UserEntity } from "../../domain";
import { BcryptAdapter } from '../../config/bcrypt';
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = ( password: string ) => string;
type CompareFunction = ( password: string, hashed: string ) => boolean;



export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { username, password } = loginUserDto;

        try {

            if( !username || !password) throw CustomError.badRequest(INVALID_REQUEST);

            // 1. Verificar si el username existe
            const user = await UserModel.findOne({ username });
            if( !user ) throw CustomError.badRequest(USER_CREDENTIALS);

            // 2. Comparar la contraseña
            const verifyPassword = this.comparePassword( password, user.password );
            if( verifyPassword == false ) throw CustomError.badRequest(USER_CREDENTIALS);


            //3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if( error instanceof CustomError ){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {

        const { name, username, password } = registerUserDto;

        try {

            // 1. Verificar si el username existe
            const exists = await UserModel.findOne({ username });
            if( exists ) throw CustomError.badRequest(REGISTERED_USER);

            const user = await UserModel.create({
                name,
                username,
                password: this.hashPassword( password ),
            });

            //2. Hash de contraseña 


            await user.save();

            //3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            
            if( error instanceof CustomError ){
                throw error;
            }
            
            throw CustomError.internalServer();
        }
    }

}