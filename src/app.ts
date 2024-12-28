import express, { Request, Response } from "express"

const app = express()

app.get("", (request: Request, response: Response) => {
    response.send("Ready!")
})

export default app