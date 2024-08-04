import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../model/user.entity";

export interface Req extends FastifyRequest{
    user?: User
}
export interface Res extends FastifyReply{}