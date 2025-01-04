import express, { Request, Response } from "express"
import cuentaRouter from "./routes/cuenta.routes"
import authRouter from "./routes/auth.routes"

const app = express()

app.use(express.json())

app.get("", (request: Request, response: Response) => {
    response.send("Ready!")
})

app.use("/cuenta", cuentaRouter)
app.use("/auth", authRouter)

export default app