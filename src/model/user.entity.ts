import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";
import { UserRole } from "../enum/user";

@Entity({ name: "user" })
export class User extends Base {
    @Column({ name: "full_name" })
    fullName: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column({ enum: UserRole, type: 'enum' })
    role: UserRole

    @Column({ name: "parent_id" })
    parentId: number
}