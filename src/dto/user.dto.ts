import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

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

export class FeedbackDto {
  @IsNumber()
  mark: number;

  @IsBoolean()
  department: boolean;

  @IsBoolean()
  excursion: boolean;

  @IsBoolean()
  mentor: boolean;

  @IsBoolean()
  interest: boolean;

  @IsBoolean()
  advice: boolean;

  @IsBoolean()
  presentation: boolean;

  @IsString()
  description: string;
}

export class AddFeedbackDto {
  @IsNumber()
  userId: number;

  feedback: FeedbackDto;
}