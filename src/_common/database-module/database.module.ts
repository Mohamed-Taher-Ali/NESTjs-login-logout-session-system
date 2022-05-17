import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { repositoriesModel } from './database.repositories'

@Global()
@Module({
  providers: [databaseProvider, ...repositoriesModel],
  exports: [databaseProvider, ...repositoriesModel],
})
export class DatabaseModule {}