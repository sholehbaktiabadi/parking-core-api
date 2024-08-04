import { FastifyInstance } from "fastify"
import { userAuth } from "../../middleware/middleware"
import { AppDataSource } from "../../config/mysql.config"
import { VisitorRepository } from "./visitor.repository"
import { VisitorService } from "./visitor.service"
import { Req, Res } from "../../interface/router"
import { CreateVisitorDto, UpdateVisitorDto } from "./dto/visitor.dto"
import { response } from "../../helper/response"
import { rMsg } from "../../const/response"
import { decodeJwt } from "../../helper/jwt"
import { User } from "../../model/user.entity"
import { PriceRepository } from "../price/price.repository"
import { validation } from "../../helper/validation"

class VisitorRoute {
    static db = AppDataSource
    static visitorRepo = new VisitorRepository(VisitorRoute.db)
    static priceRepo = new PriceRepository(VisitorRoute.db)
    static visitorService = new VisitorService(VisitorRoute.visitorRepo, VisitorRoute.priceRepo)

    static async detail(req: Req, r: Res) {
        const { id } = req.params as { id: number }
        const data = await this.visitorService.detail(r, +id)
        return response(r, data)
    }

    static async create(req: Req, r: Res) {
        const user = decodeJwt(req) as User
        const body = req.body
        const visitor = new CreateVisitorDto()
        const dataValue = Object.assign(visitor, body)
        const { valid, msg } = await validation(dataValue)
        if(!valid) return response(r, msg, 400)
        const data = await this.visitorService.create(r, dataValue, user)
        return response(r, data)
    }

    static async update(req: Req, r: Res) {
        const user = decodeJwt(req) as User
        const body = req.body
        const { id } = req.params as { id: number }
        if(!id) return response(r, rMsg.notFoundParams, 400)
        const visitor = new UpdateVisitorDto()
        const dataValue = Object.assign(visitor, body)
        const { valid, msg } = await validation(dataValue)
        if(!valid) return response(r, msg, 400)
        const data = await this.visitorService.update(r, +id, dataValue, user)
        return response(r, data)
    }
}

export async function visitorRoute(route: FastifyInstance) {
    route.post("", userAuth, (req, res) => VisitorRoute.create(req, res))
    route.get("/:id", userAuth, (req, res) => VisitorRoute.detail(req, res))
    route.patch("/:id", userAuth, (req, res) => VisitorRoute.update(req, res))
}