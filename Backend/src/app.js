import express from 'express'
import cors from 'cors'
import { router, todo } from './routers/index.js';



const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())


app.use("/api/v1", router)
app.use("/api/v2", todo)



export {app}