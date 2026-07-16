import app from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";
import { connectRedis } from "./config/redis";
import { defineAssosiation } from "./models/assosiation";

const startServer = async () => {
    try {
        await connectDB();
        defineAssosiation();
        await connectRedis();
        app.listen(env.PORT, () => {
            console.log(`Server connected successfully on port ${env.PORT}`);
        })
    } catch (error) {
        console.log(`server connection failed with error ${error}`);
        process.exit(1);
    }
}

startServer();