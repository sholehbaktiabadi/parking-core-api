import { IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator"
import { PaymentEnum, VisitorEnum, VisitorStatus } from "../../../enum/visitor"

export class CreateVisitorDto{
    @IsString()
    uniqueId: string

    @IsEnum(VisitorEnum)
    type: VisitorEnum
}

export class UpdateVisitorDto{
    @IsEnum(PaymentEnum)
    paymentType: PaymentEnum

    @IsNumber()
    quantity: number

    @IsNumber()
    grandTotal: number

    @IsEnum(VisitorStatus)
    @IsOptional()
    status: VisitorStatus = VisitorStatus.COMPLETED

    @ValidateIf(o => o.status == VisitorStatus.FAILED)
    @IsString()
    reason: string
}