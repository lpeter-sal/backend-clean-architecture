

export class RegisterUserDto {

    private constructor(
        public name:        string,
        public username:    string,
        public password:    string,
    ) {}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?]{

        const { name, username, password } = object;

        if( !name ) return ['El nombre es obligatorio'];
        if( !username ) return ['El username es obligatorio'];
        if( username.length < 6 ) return ['Username demasiado corto, debe tener mas de 5 caracteres'];
        if( !password ) return ['El password es obligatorio'];
        if( password.length < 6 ) return ['Password demasiado corto, debe tener mas de 5 caracteres'];



        return [
            undefined,
            new RegisterUserDto( name, username, password )
        ];
    }
    
}