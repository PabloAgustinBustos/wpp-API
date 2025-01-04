import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Perfil = sequelize.define(
    "perfil",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        firstname: {
            type: DataTypes.STRING(10),
            allowNull: true
        },

        lastname: {
            type: DataTypes.STRING(10),
            allowNull: true
        },

        birthday: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        desciption: {
            type: DataTypes.STRING(300),
            allowNull: true,
            defaultValue: "No description"
        },

        friends_amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
)

export default Perfil