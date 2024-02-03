import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeService } from './resume.sevice';
import { ResumeController } from './resume.controller';
import { Resume, ResumeSchema } from 'src/schemas/Resume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Resume.name,
        schema: ResumeSchema,
      },
    ]),
  ],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
