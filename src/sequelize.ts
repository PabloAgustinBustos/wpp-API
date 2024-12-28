import { Sequelize } from "sequelize"

const POSTGRES_DB = process.env.POSTGRES_DB as string
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME as string
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string
const POSTGRES_HOST = process.env.POSTGRES_HOST as string

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USERNAME, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: "postgres",
    logging: false
})

export default sequelize