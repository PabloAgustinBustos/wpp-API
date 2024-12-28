import sequelize from "../sequelize"
import bcrypt from "bcrypt"
import { DataType, DataTypes } from "sequelize"

const Cuenta = sequelize.define(
    "cuentas",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
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

            set(value: string){
                // Está mal implementado la generación del salt
                const salt = bcrypt.genSaltSync(123)

                const hashedPassword = bcrypt.hashSync(value, salt)

                this.setDataValue("password", hashedPassword)
            }
        }
    }
)

export default Cuenta