import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import sequelize from "./sequelize"

const SERVER_PORT = process.env.SERVER_PORT as string

sequelize.authenticate().then(() => {
    sequelize.sync({ force: true })
    
    app.listen(SERVER_PORT, () => console.log(`Escuchando al puerto ${SERVER_PORT}`))
}).catch(e => {
    console.log("Error al conectar con postgres", e)
})