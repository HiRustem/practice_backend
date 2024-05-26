import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AddFeedbackDto, UserDto } from "../dto/user.dto";
import { RepeatDto } from "../dto/repeat.dto";

@Injectable()
export class UserService {
  constructor( private readonly databaseService: DatabaseService ) {}

  async create(userDto: UserDto) {
    const { email } = userDto

    const findUser = await this.databaseService.user.findUnique({
      where: {
        email
      }
    })

    if (findUser) {
      return {
        status: false,
        description: 'Вы уже зарегистрированы. Пожалуйста, воспользуйтесь формой для повторной регистрации или обратитесь к администратору'
      }
    }

    const newUser = {
      ...userDto,
      done: false,
      date: '',
      feedback: [],
      count: 1,
    }

    await this.databaseService.user.create({
      data: newUser
    })

    return {
      status: true,
      description: 'Вы успешно зарегистрировались'
    }
  }

  async repeatCreate(repeatDto: RepeatDto) {
    const { email, period,  university, course, faculty, department } = repeatDto

    const oldData = await this.databaseService.user.findUnique({
      where: {
        email
      }
    })

    if (!oldData) {
      return {
        status: false,
        description: 'Вы еще не зарегистрированы. Пожалуйста, воспользуйтесь формой регистрации или обратитесь к администратору'
      }
    }

    const newData = {
      ...oldData,
      period,
      university,
      course,
      faculty,
      department,
      count: oldData.count + 1
    }

    await this.databaseService.user.update({
      where: {
        email
      },

      data: newData
    })

    return {
      status: true,
      description: 'Повторная регистрация прошла успешно'
    }
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