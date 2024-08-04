import { DataSource } from "typeorm";
import env from "./env.config";
import { User } from "../model/user.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysql.MYSQL_HOST,
    port: env.mysql.MYSQL_PORT,
    username: env.mysql.MYSQL_USER,
    password: env.mysql.MYSQL_PASS,
    database: env.mysql.MYSQL_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})

export async function mysqlConnection(){
    await AppDataSource.initialize()
    const isConnected = AppDataSource.isInitialized
    if(!isConnected) {
        console.log({ isMysqlConnect: isConnected })
        return process.exit()
    }
    console.log({ isMysqlConnect: isConnected })
    return
}