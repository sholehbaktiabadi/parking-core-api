import { IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    phone: string

    @IsString()
    email: string

    @IsString()
    password: string
}