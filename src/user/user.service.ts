import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AddFeedbackDto, UserDto } from "../dto/user.dto";

@Injectable()
export class UserService {
  constructor( private readonly databaseService: DatabaseService ) {}

  async getUser() {

  }

  async create(userDto: UserDto) {
    const newUser = {
      ...userDto,
      done: false,
      date: '',
      feedback: []
    }

    return await this.databaseService.user.create({
      data: newUser
    })
  }

  async addFeedback(addFeedbackDto: AddFeedbackDto) {
    const { userId, feedback } = addFeedbackDto

    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId
      }
    })

    const newFeedbackArray = [...user.feedback, JSON.stringify(feedback)]

    return await this.databaseService.user.update({
      where: {
        id: userId
      },

      data: {
        feedback: newFeedbackArray,
      }
    })
  }
}