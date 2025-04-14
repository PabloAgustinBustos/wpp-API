import { Request, Response } from "express"
import * as Cuenta from "../services/cuenta"
import * as Usuario from "../services/usuario"
import * as Perfil from "../services/profile"
import { ValidationError } from "sequelize"

type registerDTO = {
    username: string
    email: string
    password: string
}
export const register = async (request: Request<{}, {}, registerDTO>, response: Response) => {
    const { username, email, password } = request.body

    const crearCuentaResponse = await Cuenta.crearCuenta(email, password)

    if (crearCuentaResponse.error && !crearCuentaResponse.nuevaCuenta) {
        response.status(400).json(crearCuentaResponse)
        return
    } else {
        const crearUsuarioResponse = await Usuario.crearUsuario(crearCuentaResponse.nuevaCuenta!.id, username)

        if (crearUsuarioResponse.error) {
            response.status(400).json(crearCuentaResponse)
            return
        } else {
            const crearPerfilResponse = await Perfil.crearPerfil(
                crearUsuarioResponse.nuevoUsuario?.id as string
            )

            if (crearPerfilResponse.error) {
                response.status(400).json(crearCuentaResponse)
                return
            }
        }
    }

    response.sendStatus(201)
    
}