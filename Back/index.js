require("dotenv").config()
const { app, express } = require("./server.js")
const port = process.env.PORT || 3001
const bodyParser = require("body-parser")
const { logUser, signupUser } = require("./controllers/users.js")
const { postRouter } = require("./routes/posts.js")

app.use(express.json())
    //app.use(express.urlencoded({ extended: true }))

// Routes
app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)

app.use("/posts", postRouter)
app.use("/uploads", express.static("uploads"))

app.get('/', (req, res) => res.send("Hello World"))

app.listen(port, () => console.log(`Listening on port ${port}`))