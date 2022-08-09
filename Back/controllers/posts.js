const { prisma } = require("../db/db.js")

// Fonction d'appel des posts
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

// Fonction de création d'un post
async function createPost(req, res) {
    const content = req.body.content
    const email = req.email

    try {
        const user = await prisma.user.findUnique({ where: { email } })
        const userId = user.id
        console.log("userId:", userId)
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

// Fonction d'ajout d'une image dans un post
function addImageUrlInPost(req, post) {
    const hasImage = req.file != null
    if (!hasImage) return
    let pathImage = req.file.path.replace("\\", "/")
    const protocol = req.protocol
    const host = req.get("host")
    const url = `${protocol}://${host}/${pathImage}`
    post.imageUrl = url
}

// Fonction de suppression d'un post de la base de donnée
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
// Fonction d'envoi d'un commentaire dans la base de donnée
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

// Gestion d'erreur de la base donnée
function statusSent(product, res) {
    if (product == null) {
        console.log("Rien à été mis à jour")
        return res.status(404).send({ message: "Erreur dans la base de donnée" })
    }
    console.log("Tout a été mis à jour:", product)
    return Promise.resolve(res.status(200).send(product))
        .then(() => product)
}

// Fonction de modification d'un post
async function modifyPost(req, res) {
    console.log("modifyPost:", modifyPost)
    const postId = Number(req.params.id)
    const newContent = req.body.content
    console.log("newContent:", newContent)
    try {
        if (req.file != null) {
            const newImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`
            const postModified = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    content: newContent,
                    imageUrl: newImageUrl,
                },
            })
            res.send(postModified)
        } else {
            const postModified = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    content: newContent,
                },
            })
            res.send(postModified)
        }
    } catch (error) {
        res.status(500).send({ error: "Une erreur est survenue lors de la modification :", error })
    }
}

// Fonction Like
async function likePost(req, res) {
    try {
        const like = req.body
        console.log("bodyLike:", like)
        const userId = req.body.userId
        const postId = req.body.postId
        console.log("userIdOfBody:", userId)
        console.log("postIdOfBody:", postId)
        const liker = await prisma.user.findUnique({
            where: { id: userId },
        })
        console.log("liker:", liker)

        //const liked = !postId.usersLiked.includes(userId)
        //console.log("liked:", liked)

        // Ajout d'un like
        if (!postId.liker.includes(userId) && like === 1) {
            const addLike = await prisma.post.update({
                where: {
                    id: postId,
                    userId: userId,
                    usersLiked: liker,
                },
                data: {
                    like: like++,
                },
            })
            res.send(addLike)
        }

        // Retrait d'un like
        if (postId.liker.includes(userId) && like === 0) {
            const pullLike = await prisma.post.update({
                where: {
                    id: postId,
                    userId: userId,
                    usersLiked: liker,
                },
                data: {
                    like: like--,
                },
            })
            res.send(pullLike)
        }

        //if (liked) {
        //    postId.like--
        //        postId.like = postId.liker.filter(
        //            (liker) => liker !== userId
        //        )
        //} else {
        //    postId.like++
        //        postId.liker.push(userId)
        //}

        //await Post.updateOne({ id: req.params.id }, postId)

        await prisma.Like.create({
            data: {
                userId: userId,
                postId: postId,
                usersLiked: liker,
            },
        })
        console.log("usersLiked:", usersLiked)
        res.status(200).json({ postId })
    } catch (e) {
        res.status(400).send("[Error]: " + e)
    }
}

// récupérer la liste des liker du post
// Vérifier si le userId est présent dans cette liste d'id
// Si il est présent : 1) enlever son id de la liste en bdd 
// 2) Coté front adapter le bouton

module.exports = { getPosts, createPost, deletePost, createComment, modifyPost, likePost }