import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema';

@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  residence: string;

  // connections
  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  instagram?: string;

  @Prop({ required: false })
  facebook?: string;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: false })
  education?: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: true })
  userEmail: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
