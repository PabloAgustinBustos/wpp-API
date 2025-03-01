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

    console.log(request.body)
    
    try {
        const crearCuentaResponse = await Cuenta.crearCuenta(email, password)

        console.log("Cuenta creada")

        if (crearCuentaResponse.error && !crearCuentaResponse.nuevaCuenta) {
            response.json(crearCuentaResponse)
        } else {
            console.log("No hay error, creando usuario")
            const crearUsuarioResponse = await Usuario.crearUsuario(crearCuentaResponse.nuevaCuenta!.id, username)

            if (crearUsuarioResponse.error) {
                response.json(crearCuentaResponse)
            } else {
                const crearPerfilResponse = await Perfil.crearPerfil(
                    crearUsuarioResponse.nuevoUsuario?.id as string
                )

                if (crearPerfilResponse.error) {
                    response.json(crearCuentaResponse)
                }
            }
        }

        response.sendStatus(201)
    } catch (e) {
        if (e instanceof ValidationError) {
            response.status(400).json({
                error: true,
                messages: e.errors.map(error => error.message) as string[]
            })
        } else {
            response.status(400).json({
                error: true
            })
        }

    }
}