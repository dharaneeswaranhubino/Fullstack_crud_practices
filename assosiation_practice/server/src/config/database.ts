import { Sequelize } from "sequelize";
import { env } from "./env";

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    dialect: env.DB_DIALECT,
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB connected successfully`);
    } catch (error) {
        console.log(`DB connection failed with error ${error}`);
        process.exit(1);
    }
}