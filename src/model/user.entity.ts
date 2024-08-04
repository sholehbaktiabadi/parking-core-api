import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { UserRole } from "../enum/user";
import { UserSubscription } from "../enum/subscription";

@Entity({ name: "user" })
export class User extends Base {
    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    phone: string

    @Column()
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ enum: UserRole, type: 'enum' })
    role: UserRole

    @Column({ enum: UserSubscription, type: 'enum', default: UserSubscription.NONE })
    subscription: UserSubscription

    @Column({ name: "parent_id", nullable: true })
    parentId: number
}