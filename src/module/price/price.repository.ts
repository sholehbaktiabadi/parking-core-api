import { Repository, DataSource, FindOneOptions } from "typeorm"
import { Price } from "../../model/price.entity"

export class PriceRepository {
    private priceRepo: Repository<Price>
    constructor(db: DataSource) {
        this.priceRepo = db.getRepository(Price)
    }

    fetchOne(opt: FindOneOptions<Price>) {
        return this.priceRepo.findOne(opt)
    }
}