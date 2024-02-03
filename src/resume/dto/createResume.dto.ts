import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  residence: string;

  @IsNotEmpty()
  @IsString()
  profession: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  salary: string;

  // connection
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  phoneNumber?: string;

  // @IsNotEmpty()
  // @IsEmail()
  // user: string;
}
