import { InferAttributes, ValidationError } from "sequelize"
import Cuenta from "../models/Cuenta"
import Usuario from "../models/Usuario"
import { CrearReturnType } from "./types";

interface CrearUsuarioReturnType extends CrearReturnType {
    nuevoUsuario?: InferAttributes<Usuario, { omit: never; }>
    error: boolean
    details?: ValidationError
}

export const crearUsuario = async(id: string, username: string): Promise<CrearUsuarioReturnType> => {
    let user: Usuario | null = null

    try {
        user = await Usuario.create({username, cuentaId: id})
    } catch (e) {
        return {
            error: true,
            details: e as ValidationError
        }
    }

    return {
        error: false,
        nuevoUsuario: user.dataValues
    }
}