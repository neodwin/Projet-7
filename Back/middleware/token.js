const jwt = require("jsonwebtoken")

// Fonction de vérification du token
function checkingToken(req, res, next) {
    const token = req.headers.authorization //.split(" ")[1]
    if (token == null) return res.status(401).send({ error: "Token introuvable" })
    jwt.verify(token, process.env.PASSWORD_JWT, (error, decoded) => {
        console.log("decoded:", decoded)
        if (error) return res.status(401).send({ error: "Token invalide" })
        req.email = decoded.email
        next()
    })
}

module.exports = { checkingToken }