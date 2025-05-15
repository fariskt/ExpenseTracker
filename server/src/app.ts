import express from 'express';
import userRoutes from "./routes/userRoute";
import expenseRoute from "./routes/expenseRoute";
import goalRoute from "./routes/goalRoute";
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express();

app.use(cors({
    origin:["https://cashvio.vercel.app" ,"http://localhost:5173"],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoute);
app.use('/api/goals', goalRoute);

export default app;
