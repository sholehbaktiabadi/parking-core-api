import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { mysqlConnection } from "./config/mysql.config";
import { userRoutes } from "./module/user/user.route";

async function bootstrap() {
    await mysqlConnection()
    const server = fastify({ logger: true })
    server.post("/", (_req: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ "status": "ok" })
    })
    server.register(userRoutes, { prefix: "/user" })
    server.listen({ port: 3000 })
}

bootstrap()