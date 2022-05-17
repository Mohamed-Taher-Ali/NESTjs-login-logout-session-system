import { IRead, PaginationParams, PaginationResult } from './db.types';
import { Model, ModelCtor } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository <T extends Model> implements IRead<T> {
    Model!: ModelCtor<T>;

    constructor(Model: ModelCtor<T>) {
        this.Model = Model;
        console.log({thisModel: this.Model});
    }

    async findPaginated(
        paginationParams?: PaginationParams<T>
    ): Promise<PaginationResult<T>> {
        const { limit = 10, offset = 0, ...rest } = paginationParams;

        const data = await this.Model.findAll({
            offset, limit, ...rest
        });
        
        return {
            data,
            limit,
            offset
        };
    }
}