import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
    throw new Error("Missing require DB environment variables")
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected successfully");
    } catch (error) {
        console.log(`DB connection failed with error ${error}`);
    }
}