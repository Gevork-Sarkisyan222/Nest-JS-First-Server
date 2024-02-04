import { IsEmail, IsOptional, IsString, Max } from 'class-validator';

export class EditResumeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsOptional()
  residence?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  salary?: string;
}
