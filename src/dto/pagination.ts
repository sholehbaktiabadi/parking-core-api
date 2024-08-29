import { IsDate, IsDateString, IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsDateString()
    @IsOptional()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    endDate: Date;
    
    skip: number
}