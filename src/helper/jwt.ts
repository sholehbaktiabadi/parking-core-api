import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { User } from "../model/user.entity";
import { Req } from "../interface/router";

export function generateToken(user: User){
        const claims = {...user}
        return jwt.sign(claims, env.jwt.SECRET, { algorithm: "HS256" })
}

export function verifyJwt(req: Req){
        const token = req.headers.authorization.split(" ")[1]
        return jwt.verify(token, env.jwt.SECRET, { algorithms: ['HS256'] })
}

export function decodeJwt(req: Req){
        const token = req.headers.authorization.split(" ")[1]
        return jwt.decode(token, { json: true })
}