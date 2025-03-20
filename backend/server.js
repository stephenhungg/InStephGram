import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import userRoutes from "./routes/user.route.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //accept json data in body

app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});
//pCPG54aGzCs31jvv
