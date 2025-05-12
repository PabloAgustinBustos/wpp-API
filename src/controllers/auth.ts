import { Request, Response } from "express"
import * as Cuenta from "../services/cuenta"
import * as Usuario from "../services/usuario"
import * as Perfil from "../services/profile"
import { ValidationError } from "sequelize"
import jwt from "jsonwebtoken"

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

    response.sendStatus(201)
    
}

type loginDTO = {
    email: string
    password: string
}
export const login = async(request: Request<{}, {}, loginDTO>, response: Response) => {
    const { email, password } = request.body

    const cuenta = await Cuenta.buscarCuenta(email)

    if (cuenta && Cuenta.passwordCoincide(cuenta.dataValues.password, password)) {
        const TOKEN_KEY = process.env.TOKEN_KEY as string

        const token = jwt.sign({ 
            cuentaID: cuenta.dataValues.id, 
            email 
        }, TOKEN_KEY)

        console.log(token)

        response.status(200).json({
            token
        })

        return
    } else {
        response.status(400).json({
            error: true,
            message: "usuario no existe o contraseña no es correcta"
        })

        return
    }
}