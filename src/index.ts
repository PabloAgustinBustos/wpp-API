import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import sequelize from "./sequelize"
import Cuenta from "./models/Cuenta"
import Usuario from "./models/Usuario"
import Perfil from "./models/Perfil"

const SERVER_PORT = process.env.SERVER_PORT as string

sequelize.authenticate().then(() => {
    Cuenta.hasOne(Usuario)
    Usuario.belongsTo(Cuenta)

    Usuario.hasOne(Perfil)
    Perfil.belongsTo(Usuario)

    sequelize.sync({ 
        force: true,
        alter: false
    })

    console.log("conectado a la bd")

    app.listen(SERVER_PORT, () => console.log(`Escuchando al puerto ${SERVER_PORT}`))
}).catch(e => {
    console.log("Error al conectar con postgres", e)
})