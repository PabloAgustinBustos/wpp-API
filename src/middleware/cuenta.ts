import { NextFunction, Request, Response } from "express";

export const validarCrearCuentaDTO = (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body

    const faltantes = []

    if (!email) faltantes.push("email")
    if (!password) faltantes.push("password")

    if (faltantes.length > 0) {
        response.status(400).json({
            message: "Faltan datos para crear la cuenta",
            faltantes
        })
    } else {
        next()
    }
}