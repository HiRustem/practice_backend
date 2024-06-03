import { IsBoolean, IsNumber, IsString } from "class-validator";

export class AdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class GetUsersListDto {
  @IsNumber()
  skip: number;

  @IsNumber()
  take: number;
}

export class GetUsersByUniversityDto {
  @IsNumber()
  skip: number;

  @IsNumber()
  take: number;

  @IsString()
  university: string;
}

export class GetUsersByDepartmentDto {
  @IsNumber()
  skip: number;

  @IsNumber()
  take: number;

  @IsString()
  department: string;
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