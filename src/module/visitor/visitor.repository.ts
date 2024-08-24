import { Between, DataSource, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Visitor } from "../../model/visitor.entity";
import { PaginationDto } from "../../dto/pagination";

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

    getAll({ limit, skip, startDate, endDate }: PaginationDto) {
        var query: FindManyOptions<Visitor> 
        if (startDate && endDate){
            query = { where: { createdAt: Between(startDate, endDate) } }
        }
        return this.visitorRepo.findAndCount({ skip, take: limit, ...query })
    }
}