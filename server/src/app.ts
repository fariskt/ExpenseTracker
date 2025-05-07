import express from 'express';
import userRoutes from "./routes/userRoute";
// dotenv.config();
// import dotenv from 'dotenv'
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

export default app;
