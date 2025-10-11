const express = require('express');
const app = express();
const connectDB = require('./utils/db,js');
const todoRouter = require("./routes/todoRoutes.js")
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: "  http://localhost:5174", 
    credentials: true,
}));

app.use(express.json());
app.use("/api/todos",todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})