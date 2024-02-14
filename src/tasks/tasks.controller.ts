import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Returns all tasks' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':task')
  findOne(@Param('task') task: string) {
    return this.tasksService.findOne(task);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
