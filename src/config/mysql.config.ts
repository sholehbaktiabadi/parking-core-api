import { DataSource } from "typeorm";
import { User } from "../model/user.entity";
import { env } from "./env.config";
import { Visitor } from "../model/visitor.entity";
import { Price } from "../model/price.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysql.HOST,
    port: env.mysql.PORT,
    username: env.mysql.USER,
    password: env.mysql.PASS,
    database: env.mysql.NAME,
    synchronize: true,
    logging: false,
    entities: [User, Visitor, Price]
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