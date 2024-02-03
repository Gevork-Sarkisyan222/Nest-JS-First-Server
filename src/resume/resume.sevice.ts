import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResumeDto } from './dto/createResume.dto';
import { Resume } from 'src/schemas/Resume.schema';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) {}

  createResume(createResume: CreateResumeDto) {
    const resume = new this.resumeModel(createResume);
    return resume.save();
  }

  async deleteResume(id: string) {
    await this.resumeModel.findByIdAndDelete(id);
    return 'Resume has been deleted';
  }

  async editResume(id: string, resumeDto) {
    await this.resumeModel.findByIdAndUpdate(id, resumeDto);
    return 'Resume edited successfully';
  }

  async getResumesLists() {
    const resumes = this.resumeModel.aggregate([{ $sample: { size: 200 } }]);
    return resumes;
  }
}
