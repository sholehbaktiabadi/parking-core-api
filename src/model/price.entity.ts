import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { VisitorEnum } from "../enum/visitor";
import { TimeUnit } from "../enum/price";

@Entity({ name: "price" })
export class Price extends Base{

    @Column({ name: "user_id" })
    userId: number

    @Column({ type: "enum", enum: VisitorEnum })
    type: VisitorEnum

    @Column()
    price: number

    @Column({ type: "enum", enum: TimeUnit })
    unit: TimeUnit
}