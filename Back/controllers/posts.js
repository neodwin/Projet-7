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

// Modification d'un post
function modifyPost(req, res) {
    const params = req.params
    const id = params.id
    const hasModifyImage = req.file != null
    const anotherImage = madeAnotherImage(hasModifyImage, req)
    Product.findByIdAndUpdate(id, anotherImage)
        //.then((product) => statusSent(product, res))
        .then((product) => deleteFile(product))
        .catch((err) => console.error("problème de mise à jour:", err))
}

// Fonction de modification de l'image
function madeAnotherImage(hasModifyImage, req) {
    if (!hasModifyImage) return req.body
    const anotherImage = JSON.parse(req.body.post)
    const fileName = req.file.fileName
    anotherImage.imageUrl = req.protocol + "://" + req.get("host") + "/uploads/" + fileName;
    return anotherImage
}

// Gestion like & dislike

// Fonction d'appel du produit
function likePost(req, res) {
    const like = req.body.like
    const userId = req.body.userId
    if (![1, -1, 0].includes(like)) return res.status(403).send({ message: "Invalid like value" })
    postId(req, res)
        .then((product) => updateLike(product, like, userId, res))
        .then((product) => product.save())
        //.then((product) => statusSent(product, res))
        .catch((err) => res.status(500).send(err))
}

// Fonction d'ajout d'un like
function updateLike(product, like, userId, res) {
    if (like === 1 || like === -1) return modifyLike(product, userId, like)
    return resetLike(product, userId, res)
}

// Fonction de gestion d'erreur du like ou dislike
function resetLike(product, userId, res) {
    const usersLiked = product.usersLiked
    if ([usersLiked].every((array) => array.includes(userId)))
        return Promise.reject("Error")
    if (![usersLiked].some((array) => array.includes(userId)))
        return Promise.reject("Error")
    if (usersLiked.includes(userId)) {
        --product.likes
        product.usersLiked = product.usersLiked.filter((id) => id !== userId)
    }
    return product
}

// Fonction d'ajout du userId dans le usersLiked
function modifyLike(product, userId, like) {
    const usersLiked = product.usersLiked
    const likersList = like === 1 ? usersLiked : usersLiked
    if (likersList.includes(userId)) return product
    likersList.push(userId)
    like === 1 ? ++product.likes : ++product.likes
    return product
}

module.exports = { getPosts, createPost, deletePost, createComment, modifyPost, likePost }