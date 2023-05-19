// signup a new user

import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import User from '../models/user.schema.js'

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

export const signUp = asyncHandler(async (req,res) => {
    //get data from user
    const { name, email, password } = req.body;
    // validation
    if (!name || !email || !password) {
        throw new CustomError("Please add all fields",400)
    }
    
    // check if user already exists
    const existUser = await User.findOne({ email })

    if (existUser) {
        throw CustomError("User already exists",400)
    }


    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()
    //  safty
    user.password = undefined
    // store this token in cookie

    res.cookie("token",token)
    

    //send back a response to user
    res.status(200).json({
        success: true,
        token,
        user
        
    })

})