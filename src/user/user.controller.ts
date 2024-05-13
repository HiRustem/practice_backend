import { Body, Controller, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddFeedbackDto, UserDto } from "../dto/user.dto";

@Controller('user')
export class UserController {
  constructor( private readonly userService: UserService ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.create(userDto)
  }

  @Put('addFeedback')
  async addFeedback(@Body() addFeedbackDto: AddFeedbackDto) {
    return await this.userService.addFeedback(addFeedbackDto)
  }
}