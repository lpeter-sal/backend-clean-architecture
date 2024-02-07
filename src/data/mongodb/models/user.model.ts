import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({

    name: {
        type: String,
        required: [ true, 'Nombre es obligatorio']
    },
    username: {
        type: String,
        required: [ true, 'Username es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password es obligatorio'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'READ',
        enum: ['READ','ADMIN', 'SUPERADMIN']
    }

});


export const UserModel = mongoose.model( 'User', userSchema );