const { prisma } = require("../db/db.js")

async function getPosts(req, res) {
    const email = req.email
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    email: true
                }
            },
            comments: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    console.log("posts:", posts)
    res.send({ posts: posts, email })
}

async function createPost(req, res) {
    const content = req.body.content
    const email = req.email

    try {
        const user = await prisma.user.findUnique({ where: { email } })
        const userId = user.id
        const post = { content, userId }
        addImageUrlInPost(req, post)
        console.log("post:", post)

        const postInDb = await prisma.post.create({ data: post })
        res.send({ post: postInDb })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Une erreur est survenue" })
    }
}

function addImageUrlInPost(req, post) {
    const hasImage = req.file != null
    if (!hasImage) return
    let pathImage = req.file.path.replace("\\", "/")
    const protocol = req.protocol
    const host = req.get("host")
    const url = `${protocol}://${host}/${pathImage}`
    post.imageUrl = url
}

async function deletePost(req, res) {
    const postId = Number(req.params.id)
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        })
        console.log("post:", post)
        if (post == null) {
            return res.status(404).send({ error: "Post non trouvé" })
        }
        const email = req.email
        if (email !== post.user.email) {
            return res.status(404).send({ error: "Vous n'êtes pas le propriétaire de ce post" })
        }
        await prisma.comment.deleteMany({ where: { postId } })
        await prisma.post.delete({ where: { id: postId } })
        res.send({ message: "Post supprimé avec succès" })
    } catch (err) {
        res.status(500).send({ error: "Une erreur est survenue" })
    }
}

async function createComment(req, res) {
    const postId = Number(req.params.id)
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            user: {
                select: {
                    id: true
                }
            },
        }
    })
    console.log("post:", post)
    if (post == null) {
        return res.status(404).send({ error: "post non trouvé" })
    }
    const userComment = await prisma.user.findUnique({
        where: { email: req.email }
    })
    const userId = userComment.id
    const commentSending = { userId, postId, content: req.body.comment }
    const comment = await prisma.comment.create({ data: commentSending })
    res.send({ comment })
}

module.exports = { getPosts, createPost, deletePost, createComment }