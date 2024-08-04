import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { User } from "../model/user.entity";

export function generateToken(user: User){
        const claims = {...user}
        return jwt.sign(claims, env.jwt.SECRET, { algorithm: "HS256" })
}