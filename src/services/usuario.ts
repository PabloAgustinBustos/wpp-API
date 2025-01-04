import Cuenta from "../models/Cuenta"

export const crearUsuario = async(id: string, username: string) => {
    try {
        const cuenta = await Cuenta.findByPk(id)

        if(!cuenta) {
            return {
                error: true,
                message: "Cuenta no encontrada"
            }
        }

        const user = await cuenta.createUsuario({username})

        console.log(user)
    } catch(e) {
        return {
            error: true,
            e
        }
    }
}