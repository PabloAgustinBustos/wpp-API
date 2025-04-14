import { Router } from "express";
import { register } from "../controllers/auth";
import { validarRegisterDTO } from "../middleware/register";

const auth = Router()

// endpoint /auth/login
auth.post("/login", (req, res) => {
    res.send("Login")
})

// endpoint /auth/register
auth.post("/register", validarRegisterDTO, register)

// endpoint /auth/logout
auth.post("/logout", (req, res) => {
    res.send("Logout")
})

export default auth