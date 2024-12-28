import Cuenta from "../models/Cuenta"

export const crearCuenta = async(email: string, password: string) => {
    try {
        
        const nuevaCuenta = await Cuenta.create({email, password})
        
        return nuevaCuenta.dataValues
    } catch(e) {
        console.log("Error al crear una cuenta", e)
    }
}