import sequelize from "../sequelize"
import { DataType, DataTypes } from "sequelize"

const Cuenta = sequelize.define(
    "cuentas",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 11,
                notEmpty: true
            },

            set: (args) => {
                console.log(args)
            }
        }
    }
)