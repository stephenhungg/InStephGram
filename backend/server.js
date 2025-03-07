import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();


app.post("/users", (req, res) => {});


app.listen(5001, () => {
    connectDB();
    console.log("Server started at http://localhost:5001");
});
//pCPG54aGzCs31jvv
