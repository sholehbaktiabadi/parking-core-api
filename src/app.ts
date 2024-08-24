import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { env } from "./config/env.config";
import { mysqlConnection } from "./config/mysql.config";
import { userRoutes } from "./module/user/user.route";
import { authRoute } from "./module/auth/auth.route";
import { visitorRoute } from "./module/visitor/visitor.route";
import cors from '@fastify/cors'

async function bootstrap() {
    await mysqlConnection()
    const server = fastify({ logger: false })
    server.register(cors, {
        origin: "*"
    })
    server.get("/", (_req: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ "status": "ok" })
    })
    server.register(userRoutes, { prefix: "/user" })
    server.register(authRoute, { prefix: "/auth" })
    server.register(visitorRoute, { prefix: "/visitor" })
    server.listen({ port: env.app.PORT })
}

bootstrap()