const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { users } = require("../db/db.js")
const { prisma } = require("../db/db.js")

// Gestion du login
async function logUser(req, res) {
    console.log("req.body:", req.body)
    const { email, password } = req.body
    try {
        const user = await getUser(email)
        if (user == null) return res.status(404).send({ error: "Utilisateur introuvable" })

        const isPasswordCorrect = await checkingPassword(user, password)
        if (!isPasswordCorrect) return res.status(401).send({ error: "Mauvais mot de passe" })

        const token = makeToken(email)
        res.send({ token: token, email: user.email })
    } catch (error) {
        res.status(500).send({ error: 'Login error' })
    }
}

// Création des tokens
function makeToken(email) {
    const passwordJwt = process.env.PASSWORD_JWT
    const token = jwt.sign({ email: email }, passwordJwt, { expiresIn: "24h" })
    return token
        //return jwt.sign({ email }, process.env.PASSWORD_JWT, { expiresIn: '24h' })
}

function getUser(email) {
    console.log("email:", email)
    return prisma.user.findUnique({ where: { email } })
}

// Vérification du mot de passe 
function checkingPassword(user, password) {
    return bcrypt.compare(password, user.password)
}

// Création signup
async function signupUser(req, res) {
    const { email, password, confirmPassword } = req.body
    try {
        if (confirmPassword == null)
            return res.status(400).send({ error: "Veuillez confirmer votre mot de passe s'il vous plait" })
        if (password !== confirmPassword)
            return res.status(400).send({ error: "Les mots de passe ne sont pas identique" })
        const userInDatabase = await getUser(email)
        if (userInDatabase != null) return res.status(400).send({ error: "L'utilisateur existe déjà" })

        const hash = await passwordHash(password)
        const user = await addUserInDb({ email, password: hash })
        res.send({ user })
    } catch (error) {
        res.status(500).send({ error })
    }
}

// Ajout de l'utilisateur à la base de donnée
function addUserInDb(user) {
    return prisma.user.create({ data: user })
}

// Hachage des mots de passe
function passwordHash(password) {
    const NUMBER_OF_SALT_ROUNDS = 10
    return bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS)
}

module.exports = { logUser, signupUser }