import * as _ from "dotenv"
_.config()

export const env = ({
    app: {
        PORT: +process.env.APP_PORT,
        ENV: process.env.APP_ENV,
        NAME: process.env.APP_NAME
    },
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