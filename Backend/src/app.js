import express from 'express'
import cors from 'cors'
import { router, todo } from './routers/index.js';



const app = express();

app.use(cors(
    {
        origin: 'https://crud-with-auth.vercel.app',
        methods : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }
));

app.use(express.json())


app.use("/api/v1", router)
app.use("/api/v2", todo)



export {app}