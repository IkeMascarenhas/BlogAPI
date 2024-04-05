const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const cors = require("cors")

app.use(cors())
app.use(express.json())

//models
const User = require("./models/User")

app.use('/users', require('./routes/auth'))

app.use('/posts', require('./routes/posts'))

mongoose.connect('mongodb://localhost:27017/Blog')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch(err => console.log("Ocorreu um erro"))
    



