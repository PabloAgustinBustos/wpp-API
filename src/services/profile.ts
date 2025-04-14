import { InferAttributes, ValidationError } from "sequelize"
import Perfil from "../models/Perfil"
import { CrearReturnType } from "./types";

interface CrearPerfilReturnType extends CrearReturnType {
    nuevoPerfil?: InferAttributes<Perfil, { omit: never; }>,
    error: boolean,
    details?: ValidationError
}

export const crearPerfil = async(
    usuarioId: string,
): Promise<CrearPerfilReturnType> => {
    let nuevoPerfil: Perfil | null = null

    try {
        nuevoPerfil = await Perfil.create({usuarioId})

        return {
            error: false,
            nuevoPerfil: nuevoPerfil.dataValues
        }
    } catch (e) {
        return {
            error: true,
            details: e as ValidationError
        }
    }
}