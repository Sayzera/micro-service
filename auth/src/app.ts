import express from "express"
import "express-async-errors"
import cookieSession from "cookie-session"
import { errorHandler } from "./middlewares/error-handler"
import { NotFoundError } from "./errors/not-found-error"
import { readdirSync } from "fs"

const app = express()
app.set("trust proxy", true) // nginx proxy kullanıyorsak bunu true yapmamız gerekiyor
app.use(express.json())
app.use(
  cookieSession({
    signed: false, // cookie içerisindeki verileri şifreleme yapmaz
    secure: process.env.NODE_ENV !== "test", // sadece https üzerinden çalışır
  })
)

// routes
readdirSync("./src/routes").map((r) => {
  if (!r.includes("__test__")) app.use(require("./routes/" + r))
})

// 404 not found
app.all("*", async (req, res, next) => {
  next(new NotFoundError())
})

app.use(errorHandler)

export { app }
