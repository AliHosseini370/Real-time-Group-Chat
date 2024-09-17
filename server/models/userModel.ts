import mongoose from "mongoose";

interface IUser {
    _id: string
    fullName: string,
    email: string,
    password: string
}


const userSchema = new mongoose.Schema<IUser> ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export { User, IUser}