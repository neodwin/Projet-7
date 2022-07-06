require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require("body-parser")
const { logUser, signupUser } = require("./controllers/users.js")

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)

app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening on port ${port}`))