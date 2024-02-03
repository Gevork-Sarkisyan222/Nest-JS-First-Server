import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  Put,
  Delete,
  Request,
  Patch,
  Req,
} from '@nestjs/common';
import { ResumeService } from './resume.sevice';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { CreateResumeDto } from './dto/createResume.dto';
import { ExpressRequest } from 'src/middleware/auth';
import { EditResumeDto } from './dto/editResume.dto';

@Controller('resume')
@ApiTags()
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post('create')
  async createResume(@Req() req: ExpressRequest, @Body() createResumeDto: CreateResumeDto) {
    if (!req.user) {
      throw new HttpException('You are not authenticated', 403);
    }

    const {
      title,
      fullName,
      residence,
      profession,
      education,
      desc,
      salary,
      email,
      instagram,
      facebook,
      phoneNumber,
    } = createResumeDto;

    const userEmail = req.user.email;

    const createResume = {
      title,
      fullName,
      residence,
      profession,
      education,
      desc,
      salary,
      email,
      instagram,
      facebook,
      phoneNumber,
      userEmail,
    };

    const createdResume = await this.resumeService.createResume(createResume);
    return createdResume;
  }

  @Delete('delete/:id')
  async deleteResume(@Req() req: ExpressRequest, @Param('id') id: string) {
    if (!req.user) {
      throw new HttpException('You are not authenticated and you cant delete resume', 403);
    }
    return this.resumeService.deleteResume(id);
  }

  @Patch('edit/:id')
  async editResume(
    @Req() req: ExpressRequest,
    @Param('id') id: string,
    @Body() resumeDto: EditResumeDto,
  ) {
    if (!req.user) {
      throw new HttpException('You are not authenticated and you cant edit resume', 403);
    }
    return await this.resumeService.editResume(id, resumeDto);
  }

  @Get('lists')
  async getResumesLists() {
    return this.resumeService.getResumesLists();
  }
}
