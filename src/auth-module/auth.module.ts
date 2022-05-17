import { Global, Module } from '@nestjs/common';
import { UserModule } from 'src/user-module/user.module';
import { CustomCacheModule } from 'src/_common/cache-module/cache.module';
import { EncryptionModule } from 'src/_common/encryption-module/encryption.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    UserModule,
    EncryptionModule,
    CustomCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
