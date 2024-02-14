import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost:27017/task-manager'),
    CommonModule
  ],
  controllers: []
})
export class AppModule {}
