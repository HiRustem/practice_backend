import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { DepartmentFeedbackDto } from "src/dto/department.dto";

@Injectable()
export class DepartmentService {
    constructor(private readonly databaseService: DatabaseService) { }

    async sendFeedback(feedback: DepartmentFeedbackDto) {
        return await this.databaseService.department.create({
            data: feedback
        })
    }
}