import { ValidationError } from "sequelize"
import Cuenta from "../models/Cuenta"

export type crearCuentaReturnType = {
    error: boolean
    nuevaCuenta?: any
    messages?: string[]
}

export const crearCuenta = async(email: string, password: string): Promise<crearCuentaReturnType> => {
    try {
        const nuevaCuenta = await Cuenta.create({email, password})
        
        return {
            error: false,
            nuevaCuenta: nuevaCuenta.dataValues
        }
    } catch(e) {
        if (e instanceof ValidationError) {
            
            return {
                error: true,
                messages: e.errors.map(error => error.message) as string[]
            }
        }

        return {
            error: true
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