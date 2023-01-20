const express = require("express");
const color = require("colors")
const dotenv = require("dotenv").config();
const connectDB = require('./db/db')
const port = process.env.PORT || 7000;
// const {errorHandler} = require("./middleware/errorHandler")

const employeeRouter = require('./routes/employeeRouter.js')
const ajoreRouter = require('./routes/ajoreRouter.js')
const userRouter = require('./routes/userRouter')

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//router.use
app.use('/user', userRouter)
app.use('/employee', employeeRouter)
// app.use('/ajore', ajoreRouter)

// app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`))