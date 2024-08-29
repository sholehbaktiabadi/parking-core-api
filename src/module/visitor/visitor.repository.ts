import { Between, DataSource, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Visitor } from "../../model/visitor.entity";
import { VisitorRequestDto } from "./dto/visitor.dto";

export class VisitorRepository {
    private visitorRepo: Repository<Visitor>
    constructor(db: DataSource) {
        this.visitorRepo = db.getRepository(Visitor)
    }

    fetchOne(opt: FindOneOptions<Visitor>){
        return this.visitorRepo.findOne(opt)
    }

    create(dto: Visitor) {
        return this.visitorRepo.save(dto)
    }

    update(id: number, dto: Visitor) {
        return this.visitorRepo.update({ id }, dto)
    }

    getAll({ limit, skip, type }: VisitorRequestDto) {
        var query: FindManyOptions<Visitor>
        if (type){
            query = { where: { type } }
        }
        return this.visitorRepo.findAndCount({ skip, take: limit, ...query, order: { createdAt: "DESC" } })
    }
}