import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Usuario extends Model {}

Usuario.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
    
        username: {
            type: DataTypes.STRING(20),
        },
    
        photoURL: {
            type: DataTypes.STRING(50),
            field: "photo_url",
            defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
    },

    {
        sequelize,
        modelName: "usuarios"
    }
)

console.log("Modelos creados", sequelize.models)

export default Usuario