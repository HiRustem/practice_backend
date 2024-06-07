import { IsString } from "class-validator";

export class DepartmentFeedbackDto {
    @IsString()
    intern: string;

    @IsString()
    university: string;

    @IsString()
    mentor: string;

    @IsString()
    tasks: string;

    @IsString()
    recommendation: string;

    @IsString()
    additional: string;
}