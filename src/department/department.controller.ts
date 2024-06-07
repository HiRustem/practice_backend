import { Body, Controller, Get, Post } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { DepartmentFeedbackDto } from "src/dto/department.dto";

@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Post('sendFeedback')
    async sendFeedback(@Body() departmentFeedback: DepartmentFeedbackDto) {
        return await this.departmentService.sendFeedback(departmentFeedback)
    }

    @Get('getFeedbacks')
    async getFeedbacks() {
        return await this.departmentService.getDepartmentsFeedbacks()
    }
}