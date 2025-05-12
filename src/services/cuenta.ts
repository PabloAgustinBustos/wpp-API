import { InferAttributes, ValidationError } from "sequelize"
import bcrypt from "bcrypt"
import Cuenta from "../models/Cuenta"
import { CrearReturnType } from "./types";

interface CrearCuentaReturnType extends CrearReturnType {
    nuevaCuenta?: InferAttributes<Cuenta, { omit: never; }>
    error: boolean,
    details?: ValidationError
}

export const crearCuenta = async(email: string, password: string): Promise<CrearCuentaReturnType> => {
    let nuevaCuenta: Cuenta | null = null

    try {
        nuevaCuenta = await Cuenta.create({email, password})

        return {
            error: false,
            nuevaCuenta: nuevaCuenta.dataValues
        }

    } catch (e) {
        return {
            error: true,
            details: e as ValidationError
        }
    }
}

export const obtenerCuentas = async() => {
    try {
        const cuentas = await Cuenta.findAll()

        return cuentas.map(cuenta => cuenta.dataValues)        
    } catch(e) {
        console.log("Error al obtener cuentas", e)
    }
}

export const buscarCuenta = async(email: string) => {
    try {
        console.log("Buscando cuenta con email", email)
        const cuenta = await Cuenta.findOne({
            where: {
                email
            }
        })
    
        console.log("Encontré la cuenta", cuenta)
        return cuenta
    } catch(e) {
        console.log("ocurrió un error :(", e)
    }
}

export const passwordCoincide = (hashPassword: string, password: string) => {
    console.log({password, hashPassword})

    let result = bcrypt.compareSync(password, hashPassword)

    console.log("result", result)

    return result

}