import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.routes.js';
import authRoute from './routes/auth.routes.js';
import testRoute from './routes/test.routes.js';
import userRoute from './routes/user.routes.js';
import dotenv from 'dotenv'
const app= express();
dotenv.config({
    path:'./.env'
})
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/posts',postRoute)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/test',testRoute)
app.use("/api/v1/users",userRoute)
app.listen(8000, () => console.log('Server running on port 8000'));