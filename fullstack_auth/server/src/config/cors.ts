import { CorsOptions } from "cors"

export const corsOperation: CorsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200,
}