import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserWithToken } from 'src/user-module/user.types';
import { Cache } from 'cache-manager';

@Injectable()
export class UserCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ){ }

  async checkUser(id: string): Promise<UserWithToken> {
    return await this.cacheManager.get(id);
  }

  async addUser(user: UserWithToken): Promise<Boolean> {
    await this.cacheManager.set(user.id, user);
    return true;
  }

  async deleteUser(id: string): Promise<Boolean> {
    await this.cacheManager.del(id);
    return true;
  }
}