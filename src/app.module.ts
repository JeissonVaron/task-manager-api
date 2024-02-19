import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { EnvConfiguration } from './config/app.config';
import { CommonModule } from './common/common.module';
import { TasksModule } from './tasks/tasks.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    MongooseModule.forRoot(
      process.env.MONGODB
    ),
    TasksModule,
    CommonModule,
    SeedModule
  ],
  controllers: []
})
export class AppModule {}
