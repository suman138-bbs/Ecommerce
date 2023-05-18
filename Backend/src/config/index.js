import dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://sumanbhandari9860:bhairav98@cluster0.rm3ttbx.mongodb.net/?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY:process.env.JWT_EXPIRY || "30d"
    
}

export default config