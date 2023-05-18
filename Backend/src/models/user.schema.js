import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "bcryptjs"
const { Schema } = mongoose;
import config from "../config/index.js";
import JWT from 'jsonwebtoken'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: ["true", "Name is required"],
            maxLength:[50,"Name must be less than 50 chars"]
            
        },
        email: {
            type: String,
            required: ['true', "Em is required"],
            
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [8, "password must be at least 8 chars"],
            select:false
            
        },
        role:{
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
            
        },
        forgotPasswordPasswordToken: String,
        forgotPasswordPasswordExpiry:Date


    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
     this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods = {
    // compare password
    comparePassword: async function (enteredPassword) {
       return await bcrypt.compare(enteredPassword,this.password)
    },
    // generate JWT Token
    getJWTtoken: function () {
        JWT.sign({_id:this._id}, config.JWT_SECRET, {
            expiresIn:config.JWT_EXPIRY
        })
    }
}

export default mongoose.model("User",userSchema)