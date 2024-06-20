import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.routes.js';
import authRoute from './routes/auth.routes.js';
import dotenv from 'dotenv'
const app= express();
dotenv.config({
    path:'./.env'
})
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/post',postRoute)
app.use('/api/v1/auth',authRoute)
app.listen(8000, () => console.log('Server running on port 3000'));