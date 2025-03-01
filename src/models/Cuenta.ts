import sequelize from "../sequelize"
import bcrypt from "bcrypt"
import { CreationOptional, DataType, DataTypes, HasOneCreateAssociationMixin, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import Usuario from "./Usuario"

class Cuenta extends Model<InferAttributes<Cuenta>, InferCreationAttributes<Cuenta>> {
    declare id: CreationOptional<string>
    declare email: string
    declare password: string
}

Cuenta.init(
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
                console.log("Contraseña plana", value)

                const salt = bcrypt.genSaltSync(10)

                const hashedPassword = bcrypt.hashSync(value, salt)

                console.log("Contraseña hasheada", hashedPassword)

                this.setDataValue("password", hashedPassword)
            }
        }
    },
    {
        sequelize,
        modelName: "cuentas"
    }
)

console.log("Modelos creados", sequelize.models)

export default Cuenta