import { genSaltSync, hashSync, compare } from "bcrypt";

export function hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
}

export function compareHashPassword(password: string, hash: string){
    return compare(password, hash)
}