const express = require("express")
const { getUserInfo } = require("../controllers/users.js")
const { checkingToken } = require("../middleware/token.js")

const postRouter = express.Router()


postRouter.get("/:id", getUserInfo, checkingToken)

module.exports = { postRouter }