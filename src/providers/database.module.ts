import { Module } from '@nestjs/common';
import { DATABASE_PROVIDER } from './database.provider';

@Module({
  providers: [...DATABASE_PROVIDER],
  exports: [...DATABASE_PROVIDER],
})
export class DatabaseModule {}
