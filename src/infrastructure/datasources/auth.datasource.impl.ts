import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, REGISTERED_USER, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from '../../config/bcrypt';
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = ( password: string ) => string;
type CompareFunction = ( password: string, hashed: string ) => boolean;



export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}

    async register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {

        const { name, username, password } = registerUserDto;

        try {

            // 1. Verificar si el correo existe
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