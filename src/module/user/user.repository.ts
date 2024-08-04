import { DataSource, FindOneOptions, Repository } from "typeorm";
import { User } from "../../model/user.entity";
import { UserDto } from "./dto/user.dto";

export class UserRepository{
    private userRepo: Repository<User>
    constructor(db: DataSource){
        this.userRepo = db.getRepository(User)
    }

    fetchOne(opt: FindOneOptions<User>){
        return this.userRepo.findOne(opt)
    }

    getRelativeUser(){
        return this.userRepo.find()
    }

    create(dto: UserDto){
        return this.userRepo.save(dto)
    }
}