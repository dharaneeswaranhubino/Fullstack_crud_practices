import express from "express";
import router from "./routes/index"
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser"
import helmet from "helmet";
import cors from "cors";
import { corsOperation } from "./config/cors";

const app = express();

app.use(helmet());
app.use(cors(corsOperation));
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running successfully' });
});

app.use("/api/v1", router);

app.use(errorHandler);

export default app;