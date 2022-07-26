const { prisma } = require("../db/db.js")

const comment1 = {
    id: "comment1",
    user: "bob@bob.com",
    content: "This is my first comment",
}

const comment2 = {
    id: "comment2",
    user: "bob@bob.com",
    content: "This is my second comment",
}

const post1 = {
    id: "1",
    user: "edwin@edwin.fr",
    content: "This is my first post",
    url: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    comments: [comment1, comment2],
}

const post2 = {
    id: "2",
    user: "edwin@edwin.fr",
    content: "This is my second post",
    url: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    comments: [comment2]
}

const post3 = {
    id: "3",
    user: "edwin@edwin.fr",
    content: "This is my third post",
    url: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    comments: []
}

const posts = [post1, post2, post3]

async function getPosts(req, res) {
    const email = req.email
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    email: true
                }
            },
            comments: true,
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

function deletePost(req, res) {
    const postId = req.params.id
    const post = posts.find((post) => post.id === postId)
    if (post == null) {
        return res.status(404).send({ error: "Post non trouvé" })
    }
    const index = posts.indexOf(post)
    posts.splice(index, 1)
    deleteComments(post)
    res.send({ message: `Post ${postId} a été supprimé avec succès`, posts })
}

function deleteComments(post) {
    post.comments = []
}

function createComment(req, res) {
    const postId = req.params.id
    const post = posts.find((post) => post.id === postId)

    if (post == null) {
        return res.status(404).send({ error: "post non trouvé" })
    }
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const user = req.email
    const commentSending = { id, user, content: req.body.comment }
    post.comments.push(commentSending)
    res.send({ post })
}

module.exports = { getPosts, createPost, deletePost, createComment }