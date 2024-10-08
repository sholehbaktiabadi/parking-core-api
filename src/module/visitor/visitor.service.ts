import dayjs from "dayjs";
import { response } from "../../helper/response";
import { Res } from "../../interface/router";
import { User } from "../../model/user.entity";
import { Visitor } from "../../model/visitor.entity";
import { PriceRepository } from "../price/price.repository";
import { CreateVisitorDto, UpdateVisitorDto, VisitorRequestDto } from "./dto/visitor.dto";
import { VisitorRepository } from "./visitor.repository";
import { rMsg } from "../../const/response";
import { VisitorStatus } from "../../enum/visitor";
import { CurrencyFmt } from "../../helper/formatter";

export class VisitorService {
    constructor(
        private visitorRepo: VisitorRepository,
        private priceRepo: PriceRepository
    ) { }

    async detail(r: Res, id: number) {
        const selected = await this.visitorRepo.fetchOne({ where: { id } })
        if (!selected) return response(r, rMsg.notFound, 400)
            const { createdAt, timeUnit, price, departedAt } = selected
        const timeSetPoint = departedAt ? dayjs(departedAt) : dayjs()
        const quantity = timeSetPoint.diff(createdAt, timeUnit)
        const grandTotal = quantity > 0 ? price * quantity : price
        const result = { ...selected, quantity, grandTotal: CurrencyFmt(grandTotal) }
        return result
    }

    async create(r: Res, dto: CreateVisitorDto, user: User) {
        const selected = await this.priceRepo.fetchOne({
            where: { userId: user.id, type: dto.type },
            select: ['price', 'unit']
        })
        if (!selected) return response(r, "price setted yet", 400)
        const visitor = new Visitor()
        visitor.timeUnit = selected.unit
        visitor.price = selected.price
        const entity = Object.assign(visitor, dto)
        return await this.visitorRepo.create(entity)
    }

    async update(r: Res, id: number, { paymentType, status, quantity, grandTotal, reason }: UpdateVisitorDto, user: User) {
        const selected = await this.visitorRepo.fetchOne({ where: { id } })
        if (!selected) return response(r, rMsg.notFound, 400)
        const { status: trxStatus } = selected
        if (trxStatus !== VisitorStatus.INPROGRESS) return response(r, `unable update ${trxStatus} status`, 403)
        selected.departedAt = dayjs().toDate()
        selected.paymentType = paymentType
        selected.status = status
        selected.reason = reason
        selected.quantity = quantity
        selected.grandTotal = grandTotal.toString()
        return await this.visitorRepo.update(id, selected)
    }
    
    async getAll(_: Res, dto: VisitorRequestDto): Promise<[Visitor[], number]>{
        const [visitors, count] = await this.visitorRepo.getAll(dto)
        const data : Visitor[] = visitors.map(data => {
            const timeSetPoint = data.departedAt ? dayjs(data.departedAt) : dayjs()
            const quantity = timeSetPoint.diff(data.createdAt, data.timeUnit)
            const grandTotal = quantity > 0 ? data.price * quantity : data.price
            return { ...data, quantity: quantity == 0 ? 1 : quantity , grandTotal: CurrencyFmt(grandTotal) }
        })
        return [data, count]

    }
}