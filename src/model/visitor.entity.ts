import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { PaymentEnum, VisitorEnum, VisitorStatus } from "../enum/visitor";
import { TimeUnit } from "../enum/price";

@Entity({ name: "visitor" })
export class Visitor extends Base{
    @Column({ name: "unique_id" })
    uniqueId: string

    @Column({ type: "enum", enum: VisitorEnum })
    type: VisitorEnum

    @Column({ name: "price" })
    price: number

    @Column({ nullable: true, type: 'varchar' })
    reason: string

    @Column({ nullable: true })
    quantity: number

    @Column({ nullable: true, name: "grand_total" })
    grandTotal: number

    @Column({ nullable: true, enum: VisitorStatus, default: VisitorStatus.INPROGRESS, type: 'enum' })
    status: VisitorStatus

    @Column({ type: "enum", name: "time_unit", enum: TimeUnit })
    timeUnit: TimeUnit

    @Column({ name: "payment_type", type: "enum", enum: PaymentEnum, nullable: true })
    paymentType: PaymentEnum

    @Column({ type: "timestamp", name: "departed_at", nullable: true })
    departedAt: Date
}