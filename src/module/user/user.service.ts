import { UserRepository } from "./user.repository";
import { Res } from "../../interface/router";

export class UserService{
    constructor(private userRepo: UserRepository){}

    async getRelativeUser(r: Res){
        return await this.userRepo.getRelativeUser()
    }
}