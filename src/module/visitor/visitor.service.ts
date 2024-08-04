import dayjs from "dayjs";
import { response } from "../../helper/response";
import { Res } from "../../interface/router";
import { User } from "../../model/user.entity";
import { Visitor } from "../../model/visitor.entity";
import { PriceRepository } from "../price/price.repository";
import { CreateVisitorDto, UpdateVisitorDto } from "./dto/visitor.dto";
import { VisitorRepository } from "./visitor.repository";
import { rMsg } from "../../const/response";

export class VisitorService{
    constructor(
        private visitorRepo: VisitorRepository,
        private priceRepo: PriceRepository
    ){}

    async detail(r: Res, id: number){
        const selected = await this.visitorRepo.fetchOne({ where: { id } })
        if(!selected) return response(r, rMsg.notFound, 400)
        const result = {...selected }
        return result
        
    }

    async create(r: Res, dto: CreateVisitorDto, user: User){
        const selected = await this.priceRepo.fetchOne({
            where: { userId: user.id, type: dto.type },
            select: ['price']
        })
        if(!selected) return response(r, "price setted yet", 400)
        const visitor = new Visitor()
        visitor.estimationPrice = selected.price
        const entity = Object.assign(visitor, dto)
        return await this.visitorRepo.create(entity)
    }

    async update(r: Res, id: number, { paymentType }: UpdateVisitorDto, user: User){
        const selected = await this.visitorRepo.fetchOne({ where: { id } })
        if(!selected) return response(r, rMsg.notFound, 400)
        selected.departedAt = dayjs().toDate()
        selected.paymentType = paymentType
        return await this.visitorRepo.update(id, selected)
    }
}