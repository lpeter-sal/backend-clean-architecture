import { CustomError, INVALID_REQUEST, UserEntity } from "../../domain";



export class UserMapper {

    static userEntityFromObject(object: { [key: string]:any }) {

        const { id, _id, name, username, password, role } = object;

        if( !_id || !id ) {
            throw CustomError.badRequest(INVALID_REQUEST);
        }

        if( !name ) throw CustomError.badRequest(INVALID_REQUEST);
        if( !username ) throw CustomError.badRequest(INVALID_REQUEST);
        if( !password ) throw CustomError.badRequest(INVALID_REQUEST);
        if( !role ) throw CustomError.badRequest(INVALID_REQUEST);


        return new UserEntity(
            id || _id,
            name,
            username,
            password,
            role,
        );
    }


}
