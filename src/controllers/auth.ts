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

    let crearPerfilResponse = null
    let crearUsuarioResponse = null
    let crearCuentaResponse = await Cuenta.crearCuenta(email, password)

    if (crearCuentaResponse.error && !crearCuentaResponse.nuevaCuenta) {
        response.status(400).json(crearCuentaResponse)
        return
    } else {
        crearUsuarioResponse = await Usuario.crearUsuario(crearCuentaResponse.nuevaCuenta!.id, username)

        if (crearUsuarioResponse.error) {
            response.status(400).json(crearCuentaResponse)
            return
        } else {
            crearPerfilResponse = await Perfil.crearPerfil(
                crearUsuarioResponse.nuevoUsuario?.id as string
            )

            if (crearPerfilResponse.error) {
                response.status(400).json(crearCuentaResponse)
                return
            }
        }
    }

    // Generar token para usuario, perfil y contraseña

    response.sendStatus(201)
    
}