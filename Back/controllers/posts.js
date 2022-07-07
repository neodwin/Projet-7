const comment1 = {
    user: "bob@bob.com",
    content: "This is my first comment",

}

const comment2 = {
    user: "bob@bob.com",
    content: "This is my second comment",
}

const post1 = {
    user: "edwin@edwin.fr",
    content: "This is my first post",
    url: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    comments: [comment1, comment2],
}

const post2 = {
    user: "edwin@edwin.fr",
    content: "This is my second post",
    url: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    comments: [comment2]
}

const post3 = {
    user: "edwin@edwin.fr",
    content: "This is my third post",
    url: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    comments: []
}

const posts = [post1, post2, post3]

function getPosts(req, res) {
    const email = req.email
    res.send({ posts, email })
}

function createPost(req, res) {
    const content = req.body.content
    const email = req.email
    const post = { content, user: email, comments: [] }
    posts.unshift(post)
    res.send({ post })
}

module.exports = { getPosts, createPost }