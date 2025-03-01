import { Router } from "express";
import { register } from "../controllers/auth";

const auth = Router()

// endpoint /auth/login
auth.post("/login", (req, res) => {
    res.send("Login")
})

// endpoint /auth/register
auth.post("/register", register)

// endpoint /auth/logout
auth.post("/logout", (req, res) => {
    res.send("Logout")
})

export default auth