import dotenv from "dotenv";
dotenv.config();

export const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key];
    if (!value && !defaultValue) {
        throw new Error(`Missing required environment variable : ${key}`);
    }
    return value || defaultValue || "";
}

export const env = {
    PORT: Number(getEnv("PORT", "5000")),
    DB_HOST: getEnv("DB_HOST", "localhost"),
    DB_PORT: Number(getEnv("DB_PORT", "3306")),
    DB_NAME: getEnv("DB_NAME", "auth_practice"),
    DB_USER: getEnv("DB_USER", "root"),
    DB_PASS: getEnv("DB_PASS"),
    DB_DIALECT: getEnv("DB_DIALECT") as "mysql",
    ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
    REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
    ACCESS_TOKEN_EXPIRY: getEnv("ACCESS_TOKEN_EXPIRY"),
    REFRESH_TOKEN_EXPIRY: getEnv("REFRESH_TOKEN_EXPIRY"),
    // REDIS_HOST: getEnv("REDIS_HOST"),
    // REDIS_PORT: getEnv("REDIS_PORT"),
    REDIS_URL: getEnv("REDIS_URL"),
}