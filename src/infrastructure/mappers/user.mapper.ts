import { CustomError, UserEntity } from "../../domain";



export class UserMapper {

    static userEntityFromObject(object: { [key: string]:any }) {

        const { id, _id, name, username, password, roles } = object;

        if( !_id || !id ) {
            throw CustomError.badRequest('Falta un id');
        }

        if( !name ) throw CustomError.badRequest('Falta un name');
        if( !username ) throw CustomError.badRequest('Falta un username');
        if( !password ) throw CustomError.badRequest('Falta el password');
        if( !roles ) throw CustomError.badRequest('Faltan los roles');


        return new UserEntity(
            id || _id,
            name,
            username,
            password,
            roles,
        );
    }


}
