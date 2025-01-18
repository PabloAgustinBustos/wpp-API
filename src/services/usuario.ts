import { InferAttributes, ValidationError } from "sequelize"
import Cuenta from "../models/Cuenta"
import Usuario from "../models/Usuario"
import { CrearReturnType } from "./types";

interface CrearUsuarioReturnType extends CrearReturnType {
    nuevoUsuario?: InferAttributes<Usuario, { omit: never; }>
}

export const crearUsuario = async(id: string, username: string): Promise<CrearUsuarioReturnType> => {
    const user = await Usuario.create({username, cuentaId: id})

    return {
        error: false,
        nuevoUsuario: user.dataValues
    }
}