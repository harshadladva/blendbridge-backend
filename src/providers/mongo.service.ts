/*
https://docs.nestjs.com/providers#services
*/

import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.MONGO_DSN,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
  }
}
