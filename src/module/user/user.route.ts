import { FastifyInstance, RouteShorthandOptions } from "fastify"
import { UserRepository } from "./user.repository"
import { AppDataSource } from "../../config/mysql.config"
import { response } from "../../helper/response";
import { Res } from "../../interface/router";
import { UserService } from "./user.service";
import { userAuth } from "../../middleware/middleware";

class UserRoute extends UserService {
    static db = AppDataSource
    static userRepo = new UserRepository(UserRoute.db)
    static userService = new UserService(UserRoute.userRepo);

    static async getRelativeUser(r: Res) {
        const data = await this.userService.getRelativeUser(r)
        return response(r, data)
    }
}

export async function userRoutes(route: FastifyInstance) {
    route.get("/", userAuth, (_, res) => UserRoute.getRelativeUser(res))
}