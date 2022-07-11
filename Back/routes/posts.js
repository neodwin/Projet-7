const express = require("express")
const { getPosts, createPost, deletePost, createComment } = require("../controllers/posts.js")
const { checkingToken } = require("../middleware/token.js")
const { imageUpload } = require("../middleware/multer.js")

const postRouter = express.Router()

postRouter.use(checkingToken)
postRouter.post("/:id", createComment)
postRouter.delete("/:id", deletePost)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)

module.exports = { postRouter }