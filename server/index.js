const express = require('express')
require("dotenv").config()
const cors = require('cors')
const Useroutes  = require('./routes/userRoutes');
const connectDB = require('./config/db');
connectDB()


const app = express()

//! Cors connect with frontend
app.use(cors())

//! Accept Json Api
app.use(express.json())

app.use(express.urlencoded({ extended: true }))


//!Routes Loads

app.use('/user',Useroutes)
app.listen(()=>console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`))
