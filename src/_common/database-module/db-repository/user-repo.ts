import { Injectable } from '@nestjs/common';
import { User } from 'src/user-module/user.model';
import { BaseRepository } from './base-repository';

@Injectable()
export class UserRepo extends BaseRepository<User> {
    constructor() {
        super(User);
    }
}