import { HookHandlerDoneFunction } from "fastify";
import { Req, Res } from "../interface/router";
import { response } from "../helper/response";
import { rMsg } from "../const/response";

export function authentication(req: Req, r: Res, done: HookHandlerDoneFunction) {
    const auth = req.headers.authorization
    if (!auth) return response(r, rMsg.jwtNotFound, 403)
    const [_, token] = auth.split(" ")
    if (!token) return response(r, rMsg.jwtInvalid, 403)
    done()
}