import { PaginationDto } from "../dto/pagination";

export function extractPaginate(dto: PaginationDto) {
    dto.page = +dto.page
    dto.limit = +dto.limit
    dto.skip = (dto.page - 1) * dto.limit;
    return dto
}