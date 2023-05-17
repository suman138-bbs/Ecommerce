import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED");
        app.on('error', (err) => {
            console.error("Error:", err)
            throw err;
        })
        const onListining = () => {
            console.log(`Listining on PORT ${config.PORT}`)
        }
        app.listen(3000,onListining)

    } catch (err) {            
        console.err("Error:", err)
        throw err;
    }
})()