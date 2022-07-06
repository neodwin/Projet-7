const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { users } = require("../db/db.js")

// Gestion du login
function logUser(req, res) {
    const { email, password } = req.body
    const user = getUser(email)

    if (user == null) return res.status(404).send({ error: "Utilisateur introuvable" })

    checkingPassword(user, password)
        .then((passwordOk) => {
            if (!passwordOk) return res.status(401).send({ error: "Mot de passe erroné" })

            const token = makeToken(email)
            res.send({ token: token, email: user.email })
        })
        .catch(error => res.status(500).send({ error }))
}

// Création des tokens
function makeToken(email) {
    return jwt.sign({ email }, process.env.PASSWORD_JWT, { expiresIn: '24h' })
}

function getUser(email) {
    return users.find(user => user.email === email)
}

function checkingPassword(user, password) {
    return bcrypt.compare(password, user.password)
}

// Création signup
function signupUser(req, res) {
    const { email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.status(400).send({ error: "Les mots de passe ne correspondent pas" })
    const user = getUser(email)
    if (user != null) return res.status(400).send({ error: "L'utilisateur est déjà inscrit" })

    passwordHash(password)
        .then((hash) => {
            addUserInDb({ email, password: hash })
            res.send({ email: email })
        })
        .catch((error) => res.status(500).send({ error }))
}

// Hachage des mots de passe
function passwordHash(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}

// Ajout de l'utilisateur à la base de donnée
function addUserInDb(user) {
    users.push(user)
}

module.exports = { logUser, signupUser }