import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { mysqlConnection } from "./config/mysql.config";
import { userRoutes } from "./module/user/user.route";
import { authRoute } from "./module/auth/auth.route";
import { visitorRoute } from "./module/visitor/visitor.route";

async function bootstrap() {
    await mysqlConnection()
    const server = fastify({ logger: true })
    server.get("/", (_req: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ "status": "ok" })
    })
    server.register(userRoutes, { prefix: "/user" })
    server.register(authRoute, { prefix: "/auth" })
    server.register(visitorRoute, { prefix: "/visitor" })
    server.listen({ port: 3000 })
}

bootstrap()