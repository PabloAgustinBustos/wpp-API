import { Router } from "express";
import { register } from "../controllers/auth";

const auth = Router()

auth.post("/login", (req, res) => {
    res.send("Login")
})

auth.post("/register", register)

auth.post("/logout", (req, res) => {
    res.send("Logout")
})

export default auth