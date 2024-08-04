import { IsDate, IsEnum, IsNumber, IsString, validate, ValidationError } from "class-validator"
import { PaymentEnum, VisitorEnum } from "../../../enum/visitor"
import { response } from "../../../helper/response"
import { Res } from "../../../interface/router"

export class CreateVisitorDto{
    @IsString()
    uniqueId: string

    @IsEnum(VisitorEnum)
    type: VisitorEnum

    validation(r: Res, obj: this) {
        validate(obj).then((err: ValidationError[]) => {
            if (err.length > 0) {
                return response(r, err.map(({ 
                    property, constraints
                })=> ({ property, constraints })),400)
            }
        })
    }
}

export class UpdateVisitorDto{
    @IsEnum(PaymentEnum)
    paymentType: PaymentEnum

    validation(r: Res, obj: this) {
        validate(obj).then((err: ValidationError[]) => {
            if (err.length > 0) {
                return response(r, err.map(({ 
                    property, constraints
                })=> ({ property, constraints })),400)
            }
        })
    }
}