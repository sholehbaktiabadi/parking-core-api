import { FastifyRequest, FastifyReply } from "fastify";

export interface Req extends FastifyRequest{}
export interface Res extends FastifyReply{}