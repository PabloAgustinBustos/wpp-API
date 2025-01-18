import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../sequelize";
import Cuenta from "./Cuenta";

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> {
    declare id: CreationOptional<string>
    declare username: string
    declare photoURL: CreationOptional<string>
    declare cuentaId: ForeignKey<Cuenta["id"]>
}

Usuario.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    
        username: {
            type: DataTypes.STRING(20),
            set(value: string){
                console.log("seteando username de usuario", value)
                this.setDataValue("username", value)
            }
        },
    
        photoURL: {
            type: DataTypes.STRING,
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