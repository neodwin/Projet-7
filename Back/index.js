require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 3001
const app = express()


console.log("port:", port)