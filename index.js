import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes/route.js';
const port = process.env.port ?? 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router)
app.listen(port, ()=> console.log(`Server is running on port ${port}`))