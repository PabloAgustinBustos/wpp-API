import { Router } from "express";
import { login, register } from "../controllers/auth";
import { validarRegisterDTO, validarLoginDTO } from "../middleware/auth";

const auth = Router()

// endpoint /auth/login
auth.post("/login", validarLoginDTO, login)

// endpoint /auth/register
auth.post("/register", validarRegisterDTO, register)

// endpoint /auth/logout
auth.post("/logout", (req, res) => {
    res.send("Logout")
})

export default auth