import dotenv from "dotenv"
dotenv.config()

// Servidor y conexión con sequelize
import app from "./app"
import sequelize from "./sequelize"

// Modelos
import Cuenta from "./models/Cuenta"
import Usuario from "./models/Usuario"
import Perfil from "./models/Perfil"
import connectToMongoDB from "./mongo"
import Chat from "./models/Chat"

const SERVER_PORT = process.env.SERVER_PORT as string

connectToMongoDB().then(() => {
    sequelize.authenticate().then(() => {
        Cuenta.hasOne(Usuario)
        Usuario.belongsTo(Cuenta)
    
        Usuario.hasOne(Perfil)
        Perfil.belongsTo(Usuario)
    
        sequelize.sync({ 
            // force: true,
            alter: true
        })
    
        console.log("conectado a la bd")

        Chat.create({
            participants: ["user1", "user2"],
            lastMessage: {
                author: "user1",
                message: "Hola, ¿cómo estás?", 
            }
        }).then(() => {
            console.log("Chat creado")
        }).catch(e => {
            console.log("Error al crear el chat", e)
        })
    
        app.listen(SERVER_PORT, () => console.log(`Escuchando al puerto ${SERVER_PORT}`))
    }).catch(e => {
        console.log("Error al conectar con postgres", e)
    })
}).catch(e => {
    console.log("Error al conectar con MongoDB", e)
})

