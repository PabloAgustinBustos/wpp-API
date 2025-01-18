import { InferAttributes, ValidationError } from "sequelize"
import Perfil from "../models/Perfil"
import { CrearReturnType } from "./types";

interface CrearPerfilReturnType extends CrearReturnType {
    nuevoPerfil?: InferAttributes<Perfil, { omit: never; }>
}

export const crearPerfil = async(
    usuarioId: string,
): Promise<CrearPerfilReturnType> => {
    const nuevoPerfil = await Perfil.create({usuarioId})

    return {
        error: false,
        nuevoPerfil: nuevoPerfil.dataValues
    }
}