require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require("body-parser")

const user1 = { email: "edwin@edwin.fr", password: "MayTheBeer" }
const user2 = { email: "bob@bob.fr", password: "MayTheForce" }
const user3 = { email: "joe@joe.fr", password: "MayTheBug" }
const users = [user1, user2, user3]

function logUser(req, res) {
    const { email, password } = req.body
    const user = getUser(email)
    if (user == null) return res.status(404).send("Utilisateur introuvable")
    if (!passwordOk()) return res.status(401).send("Mot de passe erroné")
    const token = makeToken()
    res.send({ token: token, message: "Utilisateur loggé" })
}

function makeToken() {
    return "the user token"
}

function getUser(email) {
    return users.find(user => user.email === email)
}

function passwordOk(user, password) {
    return user.password === password
}

app.post("/auth/login", logUser)

app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening on port ${port}`))