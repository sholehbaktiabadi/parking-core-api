import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { PaymentEnum, VisitorEnum } from "../enum/visitor";

@Entity({ name: "visitor" })
export class Visitor extends Base{
    @Column({ name: "unique_id" })
    uniqueId: string

    @Column({ type: "enum", enum: VisitorEnum })
    type: VisitorEnum

    @Column({ name: "estimation_price" })
    estimationPrice: number

    @Column({ name: "payment_type", type: "enum", enum: PaymentEnum, nullable: true })
    paymentType: PaymentEnum

    @Column({ type: "timestamp", name: "departed_at", nullable: true })
    departedAt: Date
}