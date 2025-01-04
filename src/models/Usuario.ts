import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Usuario = sequelize.define(
    "usuarios",
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
    }
)

export default Usuario