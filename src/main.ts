import { NestFactory } from '@nestjs/core';
import { config } from './_common/app-configs/config';
import { AppModule } from './app-module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('/api');
  await app.listen(config.port);
}

bootstrap();
