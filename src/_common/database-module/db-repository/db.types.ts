import { FindOptions } from "sequelize";

export interface PaginationResult <T> {
    offset: number;
    limit: number;
    data: T[];
}

export type PaginationParams <T>  = FindOptions<T>

export interface IRead <T> {
    findPaginated(
        paginationParams?: PaginationParams<T>
    ): Promise<PaginationResult<T>>;
}