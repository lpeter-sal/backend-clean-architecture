

export class LoginUserDto {

    private constructor(
        public username:    string,
        public password:    string,
    ) {}

    static authentication(object: {[key: string]: any}): [string?, LoginUserDto?]{

        const { username, password } = object;

        if( !username ) return ['El username es obligatorio'];
        if( !password ) return ['El password es obligatorio'];
        if( password.length < 6 ) return ['Password demasiado corto, debe tener mas de 5 caracteres'];



        return [
            undefined,
            new LoginUserDto( username, password )
        ];
    }
    
}