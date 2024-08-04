import { DataSource, Repository } from "typeorm";
import { User } from "../../model/user.entity";

export class UserRepository{
    private userRepo: Repository<User>
    constructor(db: DataSource){
        this.userRepo = db.getRepository(User)
    }

    getRelativeUser(){
        return this.userRepo.find()
    }
}