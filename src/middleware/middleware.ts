import { RouteShorthandOptions } from "fastify";
import { authentication } from "./auth.middleware";

export const userAuth : RouteShorthandOptions = { preHandler: authentication }
