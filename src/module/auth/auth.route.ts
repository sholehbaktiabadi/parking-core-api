import { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";
import { AppDataSource } from "../../config/mysql.config";
import { Req, Res } from "../../interface/router";
import { UserDto } from "../user/dto/user.dto";
import { response } from "../../helper/response";
import { SignIn } from "./dto/sign-in.dto";

class AuthRoute {
    static db = AppDataSource
    static userRepo = new UserRepository(AuthRoute.db)
    static authService = new AuthService(AuthRoute.userRepo)

    static async login(req: Req, r: Res) {
        const body = req.body
        const user = new SignIn()
        const dataValue = Object.assign(user, body)
        user.validation(r, dataValue)
        const data = await this.authService.signIn(r, dataValue)
        return response(r, data)
    }
    static async register(req: Req, r: Res) {
        const body = req.body
        const user = new UserDto()
        const dataValue = Object.assign(user, body)
        user.validation(r, dataValue)
        const data = await this.authService.register(r, dataValue)
        return response(r, data)
    }
}

export async function authRoute(route: FastifyInstance) {
    route.post("/register", (req, res) => AuthRoute.register(req, res))
    route.post("/login", (req, res) => AuthRoute.login(req, res))
}