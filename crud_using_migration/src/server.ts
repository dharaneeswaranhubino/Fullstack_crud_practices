import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import routers from "./routers/userRouters";
import { errorHandlingMiddleware } from "./middleware/errorHandlingMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

app.use(errorHandlingMiddleware);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(`app server failed`);
        process.exit(1);
    }
}

startServer();