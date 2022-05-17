import { Module } from '@nestjs/common';
import { EncryptionService } from './encrypt.service';
import { JWTStrategyService } from './JWT-strategy.service';

@Module({
  providers: [
    EncryptionService,
    JWTStrategyService,
  ],
  exports: [EncryptionService]
})
export class EncryptionModule {}
