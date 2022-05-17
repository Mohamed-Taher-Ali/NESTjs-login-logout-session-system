import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth-module/auth.module';
import { DatabaseModule } from 'src/_common/database-module/database.module';
import { UserModule } from 'src/user-module/user.module';
import { EncryptionModule } from 'src/_common/encryption-module/encryption.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomCacheModule } from 'src/_common/cache-module/cache.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    EncryptionModule,
    CustomCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
