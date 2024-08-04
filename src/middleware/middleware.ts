import { RouteShorthandOptions } from "fastify";
import { adminMiddleware, superUserMiddleware, userMiddleware } from "./auth.middleware";

export const userAuth : RouteShorthandOptions = { preHandler: userMiddleware }
export const adminAuth : RouteShorthandOptions = { preHandler: adminMiddleware }
export const superUserAuth : RouteShorthandOptions = { preHandler: superUserMiddleware }
