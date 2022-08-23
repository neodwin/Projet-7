const express = require("express")
const { getPosts, createPost, deletePost, createComment, likePost, deleteLike, modifyPost } = require("../controllers/posts.js")
const { checkingToken } = require("../middleware/token.js")
const { imageUpload } = require("../middleware/multer.js")

const postRouter = express.Router()

postRouter.use(checkingToken)
postRouter.post("/:id", createComment)
postRouter.delete("/:id", deletePost)
postRouter.put("/:id/like", deleteLike)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)
postRouter.put("/:id", checkingToken, imageUpload, modifyPost)
postRouter.post("/:id/like", checkingToken, likePost)

module.exports = { postRouter }