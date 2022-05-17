import { Module, CacheModule } from '@nestjs/common';
import { UserCacheService } from './user-cache.service';

@Module({
  imports: [CacheModule.register({
    ttl: 99999999999999999999999999
  })],
  providers: [UserCacheService],
  exports: [UserCacheService]
})
export class CustomCacheModule {}
