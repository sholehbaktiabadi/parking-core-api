import { HookHandlerDoneFunction } from "fastify";
import { Req, Res } from "../interface/router";
import { response } from "../helper/response";
import { rMsg } from "../const/response";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { UserRole } from "../enum/user";
import { User } from "../model/user.entity";

export function userMiddleware(req: Req, r: Res, done: HookHandlerDoneFunction) {
    const auth = req.headers.authorization
    if (!auth) return response(r, rMsg.jwtRequired, 401)
    const [_, token] = auth.split(" ")
    if (!token) return response(r, rMsg.jwtRequired, 401)
    const { role } = jwt.decode(token) as User
    if (!role) return response(r, rMsg.forbidden, 401)
    const getAllowedRoles = allowedRoles(UserRole.USER)
    const isAllowed = getAllowedRoles.includes(role)
    if (!isAllowed) return response(r, rMsg.forbidden, 401)
    try {
        jwt.verify(token, env.jwt.SECRET)
    } catch {
        return response(r, rMsg.jwtInvalid, 401)
    }
    done()
}

export function adminMiddleware(req: Req, r: Res, done: HookHandlerDoneFunction) {
    const auth = req.headers.authorization
    if (!auth) return response(r, rMsg.jwtRequired, 401)
    const [_, token] = auth.split(" ")
    if (!token) return response(r, rMsg.jwtRequired, 401)
    const { role } = jwt.decode(token) as User
    if (!role) return response(r, rMsg.forbidden, 401)
    const getAllowedRoles = allowedRoles(UserRole.ADMIN)
    const isAllowed = getAllowedRoles.includes(role)
    if (!isAllowed) return response(r, rMsg.forbidden, 401)
    try {
        jwt.verify(token, env.jwt.SECRET)
    } catch {
        return response(r, rMsg.jwtInvalid, 401)
    }
    done()
}

export function superUserMiddleware(req: Req, r: Res, done: HookHandlerDoneFunction) {
    const auth = req.headers.authorization
    if (!auth) return response(r, rMsg.jwtRequired, 401)
    const [_, token] = auth.split(" ")
    if (!token) return response(r, rMsg.jwtRequired, 401)
    const { role } = jwt.decode(token) as User
    if (!role) return response(r, rMsg.forbidden, 401)
    const getAllowedRoles = allowedRoles(UserRole.SUPER_USER)
    const isAllowed = getAllowedRoles.includes(role)
    if (!isAllowed) return response(r, rMsg.forbidden, 401)
    try {
        jwt.verify(token, env.jwt.SECRET)
    } catch {
        return response(r, rMsg.jwtInvalid, 401)
    }
    done()
}

function allowedRoles(role: UserRole): UserRole[] {
    const rolePolicy: UserRole[] = []
    switch (role) {
        case UserRole.USER:
            rolePolicy.push(UserRole.ADMIN, UserRole.SUPER_USER, UserRole.USER)
            break
        case UserRole.SUPER_USER:
            rolePolicy.push(UserRole.ADMIN, UserRole.SUPER_USER)
            break
        case UserRole.ADMIN:
            rolePolicy.push(UserRole.ADMIN)
            break
        default:
            break
    }
    return rolePolicy
}