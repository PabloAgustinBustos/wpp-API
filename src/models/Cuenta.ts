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
                isEmail: {
                    msg: "El email debe ser un email válido xd"
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 11,
                notEmpty: {
                    msg: "La contraseña no puede estar vacía"
                },

                foo(value: string){
                    console.log("validando valor", value)
                }
            },

            set(value: string){
                const salt = bcrypt.genSaltSync(10)

                const hashedPassword = bcrypt.hashSync(value, salt)

                this.setDataValue("password", hashedPassword)
            }
        }
    }
)

export default Cuenta