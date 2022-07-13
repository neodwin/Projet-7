require("dotenv").config()
const { app, express } = require("./server.js")
const port = process.env.PORT || 3001
const bodyParser = require("body-parser")
const { logUser, signupUser } = require("./controllers/users.js")
const { postRouter } = require("./routes/posts.js")
    //const { prisma } = require("./db/db.js")

// Base de données
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

prisma.user.findMany().then(console.log).catch(console.error)

// Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)

app.use("/posts", postRouter)
app.use("/uploads", express.static("uploads"))

app.get('/', (req, res) => res.send("Hello World"))

app.listen(port, () => console.log(`Listening on port ${port}`))