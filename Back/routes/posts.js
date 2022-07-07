const express = require("express")
const { getPosts, createPost } = require("../controllers/posts.js")
const { checkingToken } = require("../middleware/token.js")
const postRouter = express.Router()

postRouter.use(checkingToken)
postRouter.get("/", getPosts)
postRouter.post("/", createPost)

module.exports = { postRouter }