import { Request, Response } from "express";
import { User, IUser } from "../models/userModel";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const createToken = async (_id: string): Promise<string> => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables')
    }
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3 days'}) 
}


const createUser = async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password} = req.body
    if (!validator.isEmail(email)) {
        return void res.status(400).json({error: 'Enter A Valid Email'})
    }
    try {
        const exists: IUser | null = await User.findOne({email})
        if (exists) {
            return void res.status(400).json({error: 'User Already Exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user: IUser = await User.create({fullName, email, password: hash})
        if (!user) {
            return void res.status(400).json({error: 'Error While Creating User'})
        }
        const token = await createToken(user._id)
        res.status(201).json({email, token})
    } catch (error: any) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body
    try {
        const user: IUser | null = await User.findOne({email})
        if (!user) {
            return void res.status(404).json({error: 'Incorrect Email'})
        } 
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return void res.status(400).json({error: 'Incorrect Password'})
        }
        const token = await createToken(user._id)
        res.status(200).json({email, token})
    } catch (error: any) {
        res.status(400).json({error: error.message})
    }
}

export {createUser, loginUser}
