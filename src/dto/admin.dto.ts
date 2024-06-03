import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UpdateStatusDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  done: boolean;
}

export class UpdateDateDto {
  @IsNumber()
  id: number;

  @IsString()
  date: string;
}

export class AdminLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}