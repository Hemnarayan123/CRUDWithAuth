import MongoDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from "./app.js";
import { modelNames } from "mongoose";

dotenv.config()

const PORT = process.env.PORT || 8080

MongoDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})

.catch((error) => {
    console.log("MongoDB connextion failed !!!", error);
})

