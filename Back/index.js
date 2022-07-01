require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require("body-parser")
const { logUser, signupUser } = require("./controllers/users.js")

app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)

app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening on port ${port}`))