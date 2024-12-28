import express, { Request, Response } from "express"
import cuentaRouter from "./routes/cuenta.routes"

const app = express()

app.use(express.json())

app.get("", (request: Request, response: Response) => {
    response.send("Ready!")
})

app.use("/cuenta", cuentaRouter)

export default app