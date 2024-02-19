import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly TaskModel: Model<Task>,
    private readonly configService: ConfigService
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.TaskModel.create(createTaskDto);
      return task;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const tasks = await this.TaskModel.find()
    .select('-__v');
    return tasks;
  }

  async findOne(title: string) {
    let tasks: Array<Task>;
    tasks = await this.TaskModel.find({
      title: { $regex: '.*' + title + '.*' },
    });
    if (!tasks)
      throw new NotFoundException(`La tarea con el nombre ${title} no existe`);
    return tasks;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.TaskModel.findById(id);
      if (!task)
        throw new NotFoundException(`La tarea con el id: ${id} no existe`);
      await task.updateOne(updateTaskDto, { new: true });
      return { ...task.toJSON(), ...updateTaskDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.TaskModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`La tarea ${id} no existe`);
    return;
  }

  private handleExceptions(error) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Tarea replicada en db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new BadRequestException(
      `No se logro ejecutar la accion en db ${JSON.stringify(error.keyValue)}`,
    );
  }
}
