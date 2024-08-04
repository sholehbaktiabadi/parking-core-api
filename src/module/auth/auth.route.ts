import { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";
import { AppDataSource } from "../../config/mysql.config";
import { Req, Res } from "../../interface/router";
import { CreateUserDto } from "../user/dto/user.dto";
import { response } from "../../helper/response";
import { SignIn } from "./dto/sign-in.dto";
import { validation } from "../../helper/validation";

class AuthRoute {
    static db = AppDataSource
    static userRepo = new UserRepository(AuthRoute.db)
    static authService = new AuthService(AuthRoute.userRepo)

    static async login(req: Req, r: Res) {
        const body = req.body
        const user = new SignIn()
        const dataValue = Object.assign(user, body)
        const { valid, msg } = await validation(dataValue)
        if(!valid) return response(r, msg, 400)
        const data = await this.authService.signIn(r, dataValue)
        return response(r, data)
    }
    static async register(req: Req, r: Res) {
        const body = req.body
        const user = new CreateUserDto()
        const dataValue = Object.assign(user, body)
        const { valid, msg } = await validation(dataValue)
        if(!valid) return response(r, msg, 400)
        const data = await this.authService.register(r, dataValue)
        return response(r, data)
    }
}

export async function authRoute(route: FastifyInstance) {
    route.post("/register", (req, res) => AuthRoute.register(req, res))
    route.post("/login", (req, res) => AuthRoute.login(req, res))
}