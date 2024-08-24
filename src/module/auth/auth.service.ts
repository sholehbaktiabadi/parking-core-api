import { rMsg } from "../../const/response";
import { compareHashPassword, hashPassword } from "../../helper/bcrypt";
import { generateToken } from "../../helper/jwt";
import { response } from "../../helper/response";
import { Res } from "../../interface/router";
import { CreateUserDto } from "../user/dto/user.dto";
import { UserRepository } from "../user/user.repository";
import { SignIn } from "./dto/sign-in.dto";

export class AuthService {
    constructor(private userRepo: UserRepository) { }

    async signIn(r: Res, { email, password }: SignIn) {
        const user = await this.userRepo.fetchOne({
            where: { email }, select: ['id', 'name', 'email', 'role', 'password', 'subscription']
        })
        if (!user) return response(r, rMsg.emailunRegistered)
        const isMatch = await compareHashPassword(password, user.password)
        if (!isMatch) return response(r, rMsg.invalidPassword, 403)
        delete user.password
        return generateToken(user)
    }

    async register(r: Res, dto: CreateUserDto) {
        const { password, email } = dto
        dto.password = hashPassword(password)
        const isEmailExist = await this.userRepo.fetchOne({
            where: { email }, select: ['id']
        })
        if (isEmailExist) return response(r, rMsg.emailRegistered, 400)
        const created = await this.userRepo.create(dto)
        const user = await this.userRepo.fetchOne({
            where:
                { id: created.id }, select: ['id', 'name', 'email', 'role', 'subscription']
        })
        const token = generateToken(user)
        return { ...user, token }
    }
}