import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";

/* Configurations */
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(
    rateLimit({
        windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
        max: 100,
        message: 'You exceeded 100 requests in a 12 hour limit!',
        headers: true
    })
);
(async () => {
    try {
        // await database.connect();
    } catch (e) { }
})();

/* Docker configurations */
const PORT = process.env.PORT || 8080;
// const HOST = '0.0.0.0';

/* Routes */
import { routes } from './routes';
app.use(routes);

export { app, PORT }