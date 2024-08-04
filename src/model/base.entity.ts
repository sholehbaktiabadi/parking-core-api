import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Base{
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", name: "updated_at", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date
}