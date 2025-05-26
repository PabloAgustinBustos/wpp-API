import express, { Request, Response } from "express"
import cors from "cors"
import cuentaRouter from "./routes/cuenta.routes"
import authRouter from "./routes/auth.routes"
import perfilRouter from "./routes/perfil.routes"

const app = express()

app.use(express.json())
app.use(cors())

app.get("", (request: Request, response: Response) => {
    response.send("Ready!")
})

app.use("/cuenta", cuentaRouter)
app.use("/auth", authRouter)
app.use("/perfil", perfilRouter)

export default app