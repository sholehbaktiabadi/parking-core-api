import { DataSource, FindOneOptions, Repository } from "typeorm";
import { Visitor } from "../../model/visitor.entity";

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
}