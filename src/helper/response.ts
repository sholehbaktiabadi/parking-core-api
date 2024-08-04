import { Res } from "../interface/router"

class Response {
    statusCode: number
    message: any
    constructor(status: number, message: any) {
        this.statusCode = status,
        this.message = message
    }
}

export function response(res: Res, message: any, statusCode?: number) {
    const r = new Response(statusCode ?? 200, message)
    res.status(r.statusCode)
    return res.send(r)
}