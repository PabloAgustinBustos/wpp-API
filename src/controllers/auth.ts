import { Request, Response } from "express"
import * as Cuenta from "../services/cuenta"
import * as Usuario from "../services/usuario"

type registerDTO = {
    username: string
    email: string
    password: string
}
export const register = async (request: Request<{}, {}, registerDTO>, response: Response) => {
    const { username, email, password } = request.body
    
    const crearCuentaResponse = await Cuenta.crearCuenta(email, password)

    if(!crearCuentaResponse.error) {
        Usuario.crearUsuario(crearCuentaResponse.nuevaCuenta.id, username)
    }

    response.json({})
}