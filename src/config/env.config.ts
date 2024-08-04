import * as _ from "dotenv"
_.config()

const getEnv = () => ({
    mysql: {
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: +process.env.MYSQL_PORT,
        MYSQL_NAME: process.env.MYSQL_NAME,
        MYSQL_PASS: process.env.MYSQL_PASS,
        MYSQL_USER: process.env.MYSQL_USER
    }
})
const env = getEnv()

export default env