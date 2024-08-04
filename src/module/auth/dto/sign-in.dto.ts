import { IsEmail, IsString, validate, ValidationError } from "class-validator"
import { response } from "../../../helper/response"
import { Res } from "../../../interface/router"

export class SignIn{
    @IsEmail()
    email: string
    @IsString()
    password: string
    
    validation(r: Res, obj: this) {
        validate(obj).then((err: ValidationError[]) => {
            if (err.length > 0) {
                return response(r, err.map(({ 
                    property, constraints
                })=> ({ property, constraints })))
            }
        })
    }
}