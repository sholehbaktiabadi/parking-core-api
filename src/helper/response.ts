import { Res } from "../interface/router"

export class Response {
    status: number
    message: any
    constructor(status: number, message: any) {
        this.status = status,
        this.message = message
    }
}

export function response(res: Res, message: any, statusCode?: number) {
    const r = new Response(statusCode ?? 200, message)
    res.status(r.status)
    return res.send(r)
}