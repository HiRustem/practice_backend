import { IsBoolean, IsNumber, IsString } from "class-validator";

export class RepeatDto {
  @IsString()
  email: string;

  @IsString()
  period: string;

  @IsString()
  university: string;

  @IsString()
  course: string;

  @IsString()
  faculty: string;

  @IsString()
  department: string;
}