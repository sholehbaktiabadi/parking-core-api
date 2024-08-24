import { IsDate, IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto{
    @IsString()
    @IsOptional()
    page: number = 1;

    @IsString()
    @IsOptional()
    limit: number = 10;

    @IsString()
    @IsOptional()
    search: string;

    @IsDate()
    @IsOptional()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;
    
    skip: number
}