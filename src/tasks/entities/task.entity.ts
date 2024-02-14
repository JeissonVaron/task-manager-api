import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop()
  title: string;
  
  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: false })
  favorite: boolean;

  @Prop({ default: new Date() })
  creationDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
