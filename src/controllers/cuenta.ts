import {Request, Response} from "express";
import * as Cuenta from "../services/cuenta"

type crearCuentaDTO = {
    email: string
    password: string
}
export const crearCuenta = async(request: Request<{}, {}, crearCuentaDTO>, response: Response) => {
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
        const nuevaCuenta = await Cuenta.crearCuenta(email, password)

        response.status(201).json({ nuevaCuenta })
    }
}