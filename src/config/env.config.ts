import * as _ from "dotenv"
_.config()

export const env = ({
    mysql: {
        HOST: process.env.MYSQL_HOST,
        PORT: +process.env.MYSQL_PORT,
        NAME: process.env.MYSQL_NAME,
        PASS: process.env.MYSQL_PASS,
        USER: process.env.MYSQL_USER
    },
    jwt: {
        SECRET: process.env.JWT_SECRET,
        EXPIRED: process.env.JWT_EXPIRED
    }
})