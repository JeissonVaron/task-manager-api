import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
})
export class TasksModule {}
